"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, FileText } from "lucide-react";

interface SendDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: string;
  documentNumber: string;
  defaultClientName?: string;
  defaultClientEmail?: string;
}

export function SendDocumentModal({
  isOpen,
  onClose,
  documentType,
  documentNumber,
  defaultClientName = "Alexandre de Saint-Germain",
  defaultClientEmail = "a.stgermain@gmail.com",
}: SendDocumentModalProps) {
  const [clientName, setClientName] = useState(defaultClientName);
  const [clientEmail, setClientEmail] = useState(defaultClientEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [attachPdf, setAttachPdf] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [copyAdmin, setCopyAdmin] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setClientName(defaultClientName);
    setClientEmail(defaultClientEmail);
    setSubject(`[ERG Rénovation] Votre ${documentType} N° ${documentNumber}`);
    setMessage(
      `Bonjour ${defaultClientName},\n\nVeuillez trouver ci-joint votre document officiel ${documentType} N° ${documentNumber} édité par ERG Rénovation Numérique.\n\nRestant à votre entière disposition pour tout renseignement complémentaire.\n\nCordialement,\nL'équipe ERG Rénovation`
    );
    setSendSuccess(false);
    setErrorMessage("");
  }, [documentType, documentNumber, defaultClientName, defaultClientEmail, isOpen]);

  const handleSend = async () => {
    if (!clientEmail.trim()) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      return;
    }

    setIsSending(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-document-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail,
          clientName,
          documentType,
          documentNumber,
          customSubject: subject,
          customMessage: message,
          attachPdf,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
          onClose();
        }, 2500);
      } else {
        setErrorMessage(data.error || "Erreur lors de l'envoi.");
      }
    } catch (err: any) {
      setErrorMessage("Erreur de connexion avec le serveur.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] rounded-2xl border-border bg-background p-6 shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-600">
            <Mail className="h-4 w-4" />
            <span>Envoi de Document via le CRM</span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Transmettre le Document {documentNumber}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Envoyez directement votre document officiel au client par email sécurisé avec notifications.
          </DialogDescription>
        </DialogHeader>

        {sendSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Document transmis avec succès !</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Le document {documentNumber} a été envoyé à <strong>{clientEmail}</strong> avec copie à la direction.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 text-xs bg-destructive/10 text-destructive rounded-lg border border-destructive/20 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Nom du Destinataire</Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Nom complet"
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Email Client</Label>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@domaine.fr"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Objet du Message</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-9 text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Message Personnalisé</Label>
              <Textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-xs leading-relaxed"
              />
            </div>

            <div className="space-y-2 border-t pt-3 text-xs">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attachPdf"
                  checked={attachPdf}
                  onCheckedChange={(checked) => setAttachPdf(!!checked)}
                />
                <label htmlFor="attachPdf" className="font-medium cursor-pointer flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-amber-600" />
                  <span>Joindre le fichier PDF vectoriel Haute Définition</span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="copyAdmin"
                  checked={copyAdmin}
                  onCheckedChange={(checked) => setCopyAdmin(!!checked)}
                />
                <label htmlFor="copyAdmin" className="font-medium cursor-pointer">
                  Copie de confirmation à <span className="text-amber-600">contact@erg-renovation.fr</span>
                </label>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Annuler
          </Button>

          {!sendSuccess && (
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="bg-amber-600 hover:bg-amber-500 font-bold gap-2 text-white"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Envoyer le Document
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
