import React, { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ScrollArea } from "../../ui/scroll-area";
import { Check, ChevronsUpDown, Search, X, AlertCircle } from "lucide-react";
import { cn } from "../../../lib/utils";

const AVAILABLE_SKILLS = ["React", "Java", "Javascript", "Docker", "AWS", "Negotiation", "DevOps", "Python", "C++"];

const SkillsSection = ({ formData, setFormData, errors, setErrors }) => {
  const [openPrimarySkills, setOpenPrimarySkills] = useState(false);
  const [openSecondarySkills, setOpenSecondarySkills] = useState(false);
  const [searchPrimary, setSearchPrimary] = useState("");
  const [searchSecondary, setSearchSecondary] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  // Helper function to normalize skill names (case-insensitive comparison)
  const normalizeSkill = (skill) => skill.trim().toLowerCase();

  const filteredPrimarySkills = AVAILABLE_SKILLS.filter(
    (skill) =>
      !formData.primarySkills.some((s) => normalizeSkill(s) === normalizeSkill(skill)) &&
      skill.toLowerCase().includes(searchPrimary.toLowerCase())
  );

  const filteredSecondarySkills = AVAILABLE_SKILLS.filter(
    (skill) =>
      !formData.secondarySkills.some((s) => normalizeSkill(s) === normalizeSkill(skill)) &&
      skill.toLowerCase().includes(searchSecondary.toLowerCase())
  );

  const addSkill = (type, skill) => {
    if (!skill) return;

    // Ensure skill is unique before adding
    const exists = formData[type].some((s) => normalizeSkill(s) === normalizeSkill(skill));
    if (!exists) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], skill],
      }));

      // Remove error if skill is added successfully
      if (errors[type]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[type];
          return newErrors;
        });
      }
    }
  };

  const removeSkill = (type, skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((skill) => normalizeSkill(skill) !== normalizeSkill(skillToRemove)),
    }));
  };

  const addCustomSkill = (type) => {
    const trimmed = customSkill.trim();
    if (trimmed && !formData[type].some((s) => normalizeSkill(s) === normalizeSkill(trimmed))) {
      addSkill(type, trimmed);
      setCustomSkill("");
    }
  };

  const SkillSelect = ({ type, label, open, setOpen, searchValue, setSearchValue, filteredSkills }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{label}</Label>
        {type === "primarySkills" && errors.primarySkills && (
          <div className="flex items-center text-xs text-destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            <p>{errors.primarySkills}</p>
          </div>
        )}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between border-input hover:border-neutral-400 transition-colors",
              type === "primarySkills" && errors.primarySkills ? "border-destructive" : ""
            )}
          >
            {formData[type].length > 0
              ? `${formData[type].length} skill${formData[type].length > 1 ? "s" : ""} selected`
              : `Select ${type === "primarySkills" ? "primary" : "secondary"} skills`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="flex items-center border-b px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-70" />
            <input
              type="text"
              className="flex h-8 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search skills..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <ScrollArea className="h-60">
            {filteredSkills.length > 0 ? (
              <div className="p-1">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => {
                      addSkill(type, skill);
                      setSearchValue("");
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", formData[type].some(s => normalizeSkill(s) === normalizeSkill(skill)) ? "opacity-100" : "opacity-0")}
                    />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 px-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">No skill found. Add a custom skill:</p>
                <div className="flex">
                  <Input
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    className="h-8 mr-2"
                    placeholder="Enter custom skill"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomSkill(type);
                      }
                    }}
                  />
                  <Button type="button" size="sm" onClick={() => addCustomSkill(type)}>
                    Add
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2 min-h-10 p-2 rounded-md bg-background/50">
        {formData[type].length > 0 ? (
          formData[type].map((skill, index) => (
            <Badge
              key={index}
              variant={type === "primarySkills" ? "default" : "secondary"}
              className={cn(
                "text-xs",
                type === "primarySkills" && "bg-primary/90 hover:bg-primary transition-colors"
              )}
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(type, skill)}
                className="ml-1 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground text-xs p-1.5">
            No {type === "primarySkills" ? "primary" : "secondary"} skills added
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <SkillSelect type="primarySkills" label="Primary Skills" open={openPrimarySkills} setOpen={setOpenPrimarySkills} searchValue={searchPrimary} setSearchValue={setSearchPrimary} filteredSkills={filteredPrimarySkills} />
      <SkillSelect type="secondarySkills" label="Secondary Skills" open={openSecondarySkills} setOpen={setOpenSecondarySkills} searchValue={searchSecondary} setSearchValue={setSearchSecondary} filteredSkills={filteredSecondarySkills} />
    </div>
  );
};

export default SkillsSection;
