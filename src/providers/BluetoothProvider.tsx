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

    clipDevice.onIMEIChange((newImei) => {
      localStorage.setItem("imei", newImei);
      localStorage.setItem("status", "true");
      setImei(newImei);
      setIsConnected(true);
    });

    return () => {
      clipDevice.disconnect();
    };
  }, []);

  const connectToDevice = () => {
    if (bleClip) {
      bleClip.connectToBLE();
    }
  };

  // Auto reconnect every 30 seconds if not connected
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isConnected && bleClip) {
        console.log("Attempting to reconnect to Bluetooth...");
        bleClip.connectToBLE();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isConnected, bleClip]);

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
