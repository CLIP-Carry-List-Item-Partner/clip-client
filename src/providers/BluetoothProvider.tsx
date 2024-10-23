import { createContext, useContext, useState, useEffect } from "react";
import { BLECLIP } from "@/utils/useBLE";

interface BluetoothContextProps {
  bleClip: BLECLIP | null;
  isConnected: boolean;
  connectToDevice: () => void;
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
  const [imei, setImei] = useState<string | null>(null); // Add IMEI state

  useEffect(() => {
    const clipDevice = new BLECLIP();
    setBleClip(clipDevice);

    clipDevice.onIMEIChange((newImei) => {
      localStorage.setItem("imei", newImei);
      localStorage.setItem("status", "true");
      setImei(newImei); // Update IMEI state here
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
