import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertDemoRequestSchema, type InsertDemoRequest } from "@shared/schema";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const { toast } = useToast();
  
  const form = useForm<InsertDemoRequest>({
    resolver: zodResolver(insertDemoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      sector: "",
      urgency: "",
      sloRequirements: "",
      useCase: "",
      newsletter: false,
    },
  });

  const createDemoRequest = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      return await apiRequest("POST", "/api/demo-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted",
        description: "Our team will contact you within 24 hours.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/demo-requests"] });
      form.reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDemoRequest) => {
    createDemoRequest.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-muted max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <h3 className="text-xl font-semibold mb-2">Book Your Demo</h3>
            <p className="text-muted-foreground text-sm font-normal">
              See DawsOS in action with your specific use cases
            </p>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="Full name"
                      className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                      data-testid="input-demo-name"
                    />
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
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="email"
                      placeholder="Work email"
                      className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                      data-testid="input-demo-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="Company"
                      className="bg-background border-muted text-foreground placeholder-muted-foreground focus:border-signal-teal"
                      data-testid="input-demo-company"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger 
                        className="bg-background border-muted text-foreground focus:border-signal-teal" 
                        data-testid="select-demo-role"
                      >
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="risk-manager">Risk Manager</SelectItem>
                      <SelectItem value="portfolio-analyst">Portfolio Analyst</SelectItem>
                      <SelectItem value="policy-analyst">Policy Analyst</SelectItem>
                      <SelectItem value="economist">Economist/Strategist</SelectItem>
                      <SelectItem value="credit-officer">Credit Officer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-3">
              <Button 
                type="button" 
                onClick={onClose}
                variant="outline"
                className="flex-1 border-muted text-muted-foreground hover:bg-muted/10"
                data-testid="button-demo-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createDemoRequest.isPending}
                className="flex-1 bg-signal-teal hover:bg-signal-teal/90 text-white"
                data-testid="button-demo-submit"
              >
                {createDemoRequest.isPending ? "Submitting..." : "Book Demo"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
