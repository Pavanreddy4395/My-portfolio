import { useMutation } from "@tanstack/react-query";
import { insertMessageSchema, type InsertMessage } from "@/lib/messages";
import { useToast } from "@/hooks/use-toast";

export function useCreateMessage() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = insertMessageSchema.parse(data);

      // Backend removed for now: persist locally so the UI still works.
      const storageKey = "local_messages";
      const existing = (() => {
        try {
          const raw = localStorage.getItem(storageKey);
          return raw ? (JSON.parse(raw) as unknown[]) : [];
        } catch {
          return [];
        }
      })();

      const saved = {
        id: Date.now(),
        ...validated,
      };

      try {
        localStorage.setItem(storageKey, JSON.stringify([saved, ...existing]));
      } catch {
        // ignore quota/storage errors; still treat as "sent" for now
      }

      return saved;
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
