import { HelpCircle } from "lucide-react";
import { ActionButton } from "../ActionButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";

export const HelpButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <h5 className="font-medium mb-1">Help</h5>
        <ul className="text-xs list-disc px-4 space-y-1">
          <li>You can match question and answer by clicking on them</li>
          <li>
            Results will be shown once you complete linking all the questions
          </li>
          <li>You can start game at anytime</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
