import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Send, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useCreateMessage } from "@/hooks/use-messages";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";

export default function Contact() {
  const { mutate, isPending } = useCreateMessage();

  // We need to extend the schema locally if we want to add strict client-side validation messages
  // or we can use the shared schema directly. Let's use the shared one but refine it for the form.
  const formSchema = insertMessageSchema.extend({
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  const form = useForm<InsertMessage>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertMessage) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold">Get in Touch</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href="mailto:hello@example.com" 
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-3 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-muted-foreground">hello@example.com</p>
              </div>
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-3 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Linkedin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">LinkedIn</h4>
                <p className="text-muted-foreground">Connect professionally</p>
              </div>
            </a>
            
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-3 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">GitHub</h4>
                <p className="text-muted-foreground">Check out my code</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 p-4 rounded-xl">
              <div className="p-3 bg-primary/5 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-muted-foreground">Available Remote & Relocation</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-border/50 shadow-lg shadow-black/5">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-background/50 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-background/50 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="min-h-[150px] resize-none bg-background/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium rounded-lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
