export class BLECLIP {
  private writeDatatoCLIP?: BluetoothRemoteGATTCharacteristic;
  private isREQDatatoCLIP: boolean;
  private clipIMEI: string = "KOSONG";
  private imeiChangeCallback?: (newImei: string) => void;
  private addItemCallback?: (newTagID: string) => void; // Callback for adding items
  public status: boolean = false; // Status to track connection
  private device?: BluetoothDevice; // Add device reference for disconnection
  private serviceUID: BluetoothServiceUUID =
    "65ed019f-49f7-4267-9b56-e90c2fd4b3e5";
  private characteristicUID: BluetoothCharacteristicUUID =
    "cfdf6ed8-a098-440b-a5a7-56496868a4de";

  public constructor() {
    this.isREQDatatoCLIP = false;
  }

  // Method to set the callback for adding items
  public setAddItemCallback(callback: (newTagID: string) => void) {
    if (typeof callback === 'function') {
      this.addItemCallback = callback;
    } else {
      console.warn('Provided callback is not a function.');
    }
  }

  public onIMEIChange(callback: (newImei: string) => void) {
    if (typeof callback === 'function') {
      this.imeiChangeCallback = callback;
    } else {
      console.warn('Provided callback is not a function.');
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
        this.device = device; // Store device reference for later use
        return device.gatt?.connect();
      })
      .then((server) => {
        return server?.getPrimaryService(this.serviceUID);
      })
      .then((service) => {
        return service?.getCharacteristic(this.characteristicUID);
      })
      .then((characteristic) => {
        this.writeDatatoCLIP = characteristic;
        this.isREQDatatoCLIP = true;
        this.status = true; // Set status to true when connected
        console.log("Connected");
        const myCharacteristic = characteristic;
        return myCharacteristic
          ?.startNotifications()
          .then(() => {
            myCharacteristic.addEventListener(
              "characteristicvaluechanged",
              this.responseFromBLE.bind(this)
            );
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .then(() => {
        this.requestToBLE("OPEN");
      })
      .catch((error) => {
        console.log(error);
        this.status = false; // Set status to false if connection fails
      });
  }

  // New disconnect method
  public disconnect() {
    if (this.device && this.device.gatt?.connected) {
      console.log("Disconnecting from BLE device...");
      this.device.gatt.disconnect();
      this.status = false; // Update status to false after disconnection
    } else {
      console.log("No device connected to disconnect.");
    }
  }

  public requestToBLE(msg: string): void {
    if (!this.isREQDatatoCLIP) {
      return;
    }
    const arr = msg.split("#");
    switch (arr[0]) {
      case "OPEN":
        this.writeToBLE(msg);
        break;
      case "CLOSE":
        this.writeToBLE(msg);
        break;
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
        console.log(msg);
        console.log("Sent");
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
        
        // Call the add item callback to update the scannedItems state in BeforeLoginList
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
