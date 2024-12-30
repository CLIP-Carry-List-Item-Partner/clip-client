/// <reference types="web-bluetooth" />

export class BLECLIP {
  private writeDatatoCLIP?: BluetoothRemoteGATTCharacteristic;
  private isREQDatatoCLIP: boolean;
  private clipIMEI: string = "KOSONG";
  private imeiChangeCallback?: (newImei: string) => void;
  private addItemCallback?: (newTagID: string) => void;
  public status: boolean = false;
  private device?: BluetoothDevice;
  private serviceUID: BluetoothServiceUUID =
    "65ed019f-49f7-4267-9b56-e90c2fd4b3e5";
  private characteristicUID: BluetoothCharacteristicUUID =
    "cfdf6ed8-a098-440b-a5a7-56496868a4de";

  public constructor() {
    this.isREQDatatoCLIP = false;
  }

  public setAddItemCallback(callback: (newTagID: string) => void) {
    if (typeof callback === "function") {
      this.addItemCallback = callback;
    } else {
      console.warn("Provided callback is not a function.");
    }
  }

  public onIMEIChange(callback: (newImei: string) => void) {
    if (typeof callback === "function") {
      this.imeiChangeCallback = callback;
    } else {
      console.warn("Provided callback is not a function.");
    }
  }

  public connectToBLE(): void {
    if (!navigator.bluetooth) {
      console.log("Bluetooth is not available!");
      return;
    }

    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: [this.serviceUID],
      })
      .then((device) => {
        this.device = device;
        this.device.addEventListener(
          "gattserverdisconnected",
          this.onDisconnected.bind(this)
        ); // Add event listener for disconnection
        return device.gatt?.connect();
      })
      .then((server) => server?.getPrimaryService(this.serviceUID))
      .then((service) => service?.getCharacteristic(this.characteristicUID))
      .then((characteristic) => {
        this.writeDatatoCLIP = characteristic;
        this.isREQDatatoCLIP = true;
        this.status = true;
        console.log("Connected");
        return characteristic?.startNotifications().then(() => {
          characteristic.addEventListener(
            "characteristicvaluechanged",
            this.responseFromBLE.bind(this)
          );
        });
      })
      .then(() => {
        this.requestToBLE("OPEN");
      })
      .catch((error) => {
        console.error("Connection failed:", error);
        this.status = false;
      });
  }

  public disconnect() {
    if (this.device && this.device.gatt?.connected) {
      console.log("Disconnecting from BLE device...");
      this.device.gatt.disconnect();
      this.status = false;
    }
  }

  public async reconnect() {
    if (this.device) {
      try {
        await this.device.gatt?.connect();
        console.log("Reconnected to BLE device.");
      } catch (error) {
        console.error("Reconnection failed:", error);
        throw error;
      }
    } else {
      console.error("No device available to reconnect.");
    }
  }

  private onDisconnected() {
    console.warn("Device disconnected.");
    this.status = false;
  }

  public addDisconnectionListener(callback: () => void) {
    if (this.device) {
      this.device.addEventListener("gattserverdisconnected", callback);
    }
  }

  public removeDisconnectionListener(callback: () => void) {
    if (this.device) {
      this.device.removeEventListener("gattserverdisconnected", callback);
    }
  }

  public requestToBLE(msg: string): void {
    if (!this.isREQDatatoCLIP) {
      return;
    }
    const arr = msg.split("#");
    switch (arr[0]) {
      case "OPEN":
      case "CLOSE":
      case "WRITE":
        this.writeToBLE(msg);
        break;
      default:
        break;
    }
  }

  public writeToBLE(msg: string): void {
    const encoder = new TextEncoder();
    this.writeDatatoCLIP
      ?.writeValue(encoder.encode(msg))
      .then(() => {
        console.log("Message sent:", msg);
      })
      .catch((e) => {
        console.error("Write error:", e);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private responseFromBLE(e: any): void {
    const res = e.target.value;
    const decode = new TextDecoder();
    const resDecode = decode.decode(res);
    const arr = resDecode.split("#");

    switch (arr[0]) {
      case "OPEN": {
        this.clipIMEI = arr[1];
        console.log(`clip IMEI = ${this.clipIMEI}`);
        if (this.imeiChangeCallback) {
          this.imeiChangeCallback(this.clipIMEI);
        }
        break;
      }
      default: {
        const tagID = resDecode;
        console.log(`tagID = ${resDecode}`);
        if (this.addItemCallback) {
          this.addItemCallback(tagID);
        }
        break;
      }
    }
  }

  public getIMEI() {
    return this.clipIMEI;
  }
}
