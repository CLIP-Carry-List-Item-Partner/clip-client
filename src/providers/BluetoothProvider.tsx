import { createContext, useContext, useState, useEffect } from "react";
import { BLECLIP } from "@/utils/useBLE";

interface BluetoothContextProps {
  bleClip: BLECLIP | null;
  isConnected: boolean;
  connectToDevice: () => void;
  imei: string | null;
}

const BluetoothContext = createContext<BluetoothContextProps | undefined>(
  undefined
);

export const BluetoothProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bleClip, setBleClip] = useState<BLECLIP | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [imei, setImei] = useState<string | null>(null);

  useEffect(() => {
    const clipDevice = new BLECLIP();
    setBleClip(clipDevice);

    // IMEI change callback
    clipDevice.onIMEIChange((newImei) => {
      localStorage.setItem("imei", newImei);
      localStorage.setItem("status", "true");
      setImei(newImei);
      setIsConnected(true);
    });

    // Handle GATT disconnection and attempt to reconnect
    const handleDisconnection = async () => {
      console.warn("GATT Server disconnected. Attempting to reconnect...");
      setIsConnected(false);
      try {
        await clipDevice.reconnect();
        setIsConnected(true);
        console.log("Reconnected to GATT Server.");
      } catch (error) {
        console.error("Failed to reconnect:", error);
      }
    };

    clipDevice.addDisconnectionListener(handleDisconnection);

    return () => {
      clipDevice.removeDisconnectionListener(handleDisconnection);
      clipDevice.disconnect();
    };
  }, []);

  const connectToDevice = () => {
    if (bleClip) {
      bleClip.connectToBLE();
    }
  };

  return (
    <BluetoothContext.Provider
      value={{ bleClip, isConnected, connectToDevice, imei }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  if (context === undefined) {
    throw new Error("useBluetooth must be used within a BluetoothProvider");
  }
  return context;
};
