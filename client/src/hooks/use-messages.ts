import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateMessage() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Client-side validation using the Zod schema from shared routes
      const validated = api.messages.create.input.parse(data);

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

      return api.messages.create.responses[201].parse(saved);
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
