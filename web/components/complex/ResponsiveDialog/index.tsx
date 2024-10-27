"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ResponsiveDialogProps {
    showDialog: boolean
    onClose: () => void
    title?: string
    header?: React.ReactNode
    children: React.ReactNode
}

const ResponsiveDialog = ({ showDialog, title, header, children, onClose }: ResponsiveDialogProps) => {
    const isMobile = useMediaQuery("(max-width: 640px)")

    const onOpenChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <div>
            <Dialog open={showDialog && !isMobile} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        {header && header}
                        {title && <DialogTitle>{title}</DialogTitle>}
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
            <Sheet open={showDialog && isMobile} onOpenChange={onOpenChange}>
                <SheetContent side="bottom">
                    <SheetHeader>
                        {header && header}
                        {title && <SheetTitle>{title}</SheetTitle>}
                    </SheetHeader>
                    {children}
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ResponsiveDialog

ResponsiveDialog.displayName = "ResponsiveDialog"