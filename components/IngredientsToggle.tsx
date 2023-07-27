"use client";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { IngredientsToggleProps } from "@/app/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const IngredientsToggle = ({
  ingredients,
  setIngredients,
}: IngredientsToggleProps) => {
  return (
    <>
      <div className="mt-4 p-2 pb-2 space-y-2 shadow-md w-100 rounded-lg border border-gray-200 h-auto flex flex-col items-center">
        <Switch.Group>
          <Switch.Label as="span" className="ml-3 text-sm">
            <span className="font-medium text-gray-900">
              Use Your Ingredients ?
            </span>{" "}
          </Switch.Label>
          <Switch
            checked={ingredients}
            onChange={setIngredients}
            className={
              ingredients
                ? "relative inline-flex h-5 w-10 flex-shrink-0 bg-blue-400 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
                : "relative inline-flex h-5 w-10 flex-shrink-0 bg-gray-200 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            }
          >
            <span className="sr-only">Use ingredients</span>
            <span
              className={classNames(
                ingredients ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            >
              <span
                className={classNames(
                  ingredients
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                )}
                aria-hidden="true"
              >
                <XMarkIcon />
              </span>
              <span
                className={classNames(
                  ingredients
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                )}
                aria-hidden="true"
              >
                <CheckIcon />
              </span>
            </span>
          </Switch>
        </Switch.Group>
      </div>
    </>
  );
};
export default IngredientsToggle;
