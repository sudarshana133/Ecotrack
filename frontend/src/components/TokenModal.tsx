import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (token: string) => void;
}

const TokenModal = ({ isOpen, onClose, onSubmit }: TokenModalProps) => {
  const [tokenInput, setTokenInput] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Enter Token</h2>
        <p className="mb-2">
            Get or generate token here <a href="https://account.smartthings.com/tokens" target="blank" className="text-blue-700">Learn More</a>
        </p>
        <Input
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          placeholder="Enter your token"
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(tokenInput)}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default TokenModal;