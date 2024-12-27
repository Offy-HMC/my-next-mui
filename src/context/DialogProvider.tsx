"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type DialogType = "confirm" | "form";

interface DialogOptions {
  title: string;
  message?: string; // For confirm dialogs
  initialData?: Record<string, string>; // For form dialogs with multiple inputs
  inputs?: Array<{
    id: string;
    label: string;
    type?: string;
    required?: boolean;
  }>; // Input configurations
  onConfirm?: (data?: Record<string, string>) => void; // Callback with form data
}

interface DialogContextType {
  openDialog: (type: DialogType, options: DialogOptions) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>("confirm");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [inputs, setInputs] = useState<
    Array<{ id: string; label: string; type?: string; required?: boolean }>
  >([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [onConfirm, setOnConfirm] = useState<
    ((data?: Record<string, string>) => void) | undefined
  >(undefined);

  useEffect(() => {
    // Reset touched fields and form data when dialog opens
    if (isOpen && dialogType === "form") {
      const initialTouched = inputs.reduce(
        (acc, input) => ({ ...acc, [input.id]: false }),
        {}
      );
      setTouched(initialTouched);
    }
  }, [isOpen, inputs, dialogType]);

  const openDialog = (type: DialogType, options: DialogOptions) => {
    const {
      title,
      message,
      initialData = {},
      inputs = [],
      onConfirm: confirmCallback,
    } = options;

    setDialogType(type);
    setDialogTitle(title);
    setDialogMessage(message || "");
    setFormData(initialData);
    setInputs(inputs);
    setOnConfirm(() => confirmCallback);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogTitle("");
    setDialogMessage("");
    setFormData({});
    setInputs([]);
    setOnConfirm(undefined);
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInputBlur = (id: string) => {
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const isFormValid = () => {
    return inputs.every((input) => {
      if (input.required) {
        return formData[input.id]?.trim() !== "";
      }
      return true;
    });
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogType === "confirm" && <p>{dialogMessage}</p>}
          {dialogType === "form" &&
            inputs.map((input) => (
              <TextField
                key={input.id}
                margin="dense"
                label={input.label}
                type={input.type || "text"}
                fullWidth
                required={input.required}
                value={formData[input.id] || ""}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                onBlur={() => handleInputBlur(input.id)}
                error={
                  input.required &&
                  touched[input.id] &&
                  !formData[input.id]?.trim()
                }
                helperText={
                  input.required &&
                  touched[input.id] &&
                  !formData[input.id]?.trim()
                    ? "This field is required"
                    : ""
                }
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          {onConfirm && (
            <Button
              onClick={() => {
                if (dialogType === "form") {
                  onConfirm(formData);
                } else if (dialogType === "confirm") {
                  onConfirm();
                }
                closeDialog();
              }}
              color="primary"
              autoFocus
              disabled={dialogType === "form" && !isFormValid()}
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};
