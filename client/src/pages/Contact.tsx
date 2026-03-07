import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Github, GraduationCap, Linkedin, Mail, MapPin, Phone, Send, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@/lib/messages";
import { useCreateMessage } from "@/hooks/use-messages";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Contact() {
  const { mutate, isPending } = useCreateMessage();
  const email = "brkreddy2005@gmail.com";
  const phone = "+91 8106704395";
  const githubUrl = "https://github.com/Pavanreddy4395";
  const linkedinUrl = "https://www.linkedin.com/in/bareddy-pavan-kumar-reddy-29b0a8357/";

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
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
              I’m always open to connecting with developers, learning new technologies, and working on meaningful projects. Feel free to reach out if you'd like to collaborate or discuss ideas.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href="tel:+918106704395" 
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-3 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-muted-foreground">{phone}</p>
              </div>
            </a>

            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-3 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-muted-foreground">{email}</p>
              </div>
            </a>
            
            <a 
              href={linkedinUrl}
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
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-3 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">GitHub</h4>
                <p className="text-muted-foreground">github.com/Pavanreddy4395</p>
              </div>
            </a>
            
            {/* <div className="flex items-center gap-4 p-4 rounded-xl">
              <div className="p-3 bg-primary/5 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-muted-foreground">Available Remote & Relocation</p>
              </div>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 items-start">
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
                          <Input placeholder="Your Name" {...field} className="bg-background/50 h-12" />
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
                          <Input placeholder="youremail@example.com" {...field} className="bg-background/50 h-12" />
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
                            placeholder="query or message..." 
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

          <div className="rounded-xl border border-border/60 bg-background/5 p-6">
            <h3 className="text-2xl font-display font-bold">Current Status</h3>

            <div className="mt-6 space-y-4 text-sm font-mono">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-status-online" aria-hidden />
                <div className="text-foreground">Available for opportunities</div>
              </div>

              <div className="flex items-start gap-3 text-muted-foreground">
                <GraduationCap className="mt-0.5 h-4 w-4" aria-hidden />
                <div>Pre-Final year CSE student at KL University</div>
              </div>

              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4" aria-hidden />
                <div>Based in Hyderabad, India</div>
              </div>

              <div className="flex items-start gap-3 text-muted-foreground">
                <Zap className="mt-0.5 h-4 w-4" aria-hidden />
                <div>Response time: Usually within 24 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
