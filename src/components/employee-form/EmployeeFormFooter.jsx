import React from "react"
import { DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"

const EmployeeFormFooter = ({ onClose, onSubmit, loading, isEditing, submitError }) => {
  return (
    <DialogFooter className="px-6 py-4">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 w-full">
          <p className="text-sm">{submitError}</p>
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="border-input hover:border-neutral-400 transition-colors"
        disabled={loading}
      >
        Cancel
      </Button>
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Submitting..." : isEditing ? "Update" : "Add"} Employee
      </Button>
    </DialogFooter>
  )
}

export default EmployeeFormFooter