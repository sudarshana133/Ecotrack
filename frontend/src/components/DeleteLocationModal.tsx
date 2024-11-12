import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";

interface DeleteLocationModalProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleDelete: () => void;
}

const DeleteLocationModal = ({
  open,
  onOpenChange,
  handleDelete,
}: DeleteLocationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div> {/* Backdrop */}
      <DialogContent
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6">
          {/* Adding DialogTitle for accessibility */}
          <DialogHeader className="flex flex-col gap-4 mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Delete Location
            </DialogTitle>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this location? This action cannot
              be undone.
            </p>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};

export default DeleteLocationModal;
