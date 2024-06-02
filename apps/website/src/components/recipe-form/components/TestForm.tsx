/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jyq8l07Vfqm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center h-fit bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Add a New Recipe</h1>
        <form className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block mb-2 font-medium" htmlFor="title">
              Recipe Title
            </label>
            <input
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="title"
              placeholder="Enter recipe title"
              type="text"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="description"
              placeholder="Enter recipe description"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="source">
              Source
            </label>
            <input
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="source"
              placeholder="Where did you get this recipe?"
              type="text"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="prep-time">
              Prep Time
            </label>
            <input
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="prep-time"
              placeholder="e.g., 30 minutes"
              type="text"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="cook-time">
              Cook Time
            </label>
            <input
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="cook-time"
              placeholder="e.g., 1 hour"
              type="text"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="serves">
              Serves
            </label>
            <input
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="serves"
              placeholder="Number of servings"
              type="number"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2 font-medium" htmlFor="image">
              Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
                htmlFor="image"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input className="hidden" id="image" type="file" />
              </label>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block mb-2 font-medium" htmlFor="ingredients">
              Ingredients
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  id="ingredient-name"
                  placeholder="Ingredient"
                  type="text"
                />
              </div>
              <div>
                <input
                  className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  id="ingredient-amount"
                  placeholder="Amount"
                  type="text"
                />
              </div>
              <div>
                <input
                  className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  id="ingredient-unit"
                  placeholder="Unit"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block mb-2 font-medium" htmlFor="steps">
              Steps
            </label>
            <textarea
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="steps"
              placeholder="Enter recipe steps"
              rows={5}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="meal-time">
              Meal Time
            </label>
            <select
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="meal-time"
            >
              <option value="">Select meal time</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium" htmlFor="type">
              Sweet or Savory
            </label>
            <select
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="type"
            >
              <option value="">Select type</option>
              <option value="sweet">Sweet</option>
              <option value="savory">Savory</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block mb-2 font-medium" htmlFor="keywords">
              Keywords
            </label>
            <input
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="keywords"
              placeholder="Enter keywords separated by commas"
              type="text"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2 font-medium" htmlFor="notes">
              Notes
            </label>
            <textarea
              className="bg-gray-700 border-none rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              id="notes"
              placeholder="Enter any additional notes"
              rows={3}
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="submit"
            >
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const TestText = () => {
  return (
    <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4 relative">
      <div>
        <div className="flex items-center gap-2 sm:pt-2 max-sm:pb-2">
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="cookTime"
          >
            Cook time
          </label>
          <button type="button" data-state="closed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-help h-4 w-4 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="max-w-xl sm:col-span-3 sm:mt-0">
        <div className="flex">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-r-none"
            id="cookTime"
            placeholder="Cook time"
            type="text"
            name="cookTime"
          />
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-l-none border-l-0">
            minutes
          </button>
        </div>
      </div>
    </div>
  );
};

import { PlusCircle } from "lucide-react";
import { Bird, Rabbit, Turtle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function Component() {
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <div className="grid gap-3">
            <Label htmlFor="model">Model</Label>
            <Select>
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genesis">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Rabbit className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Neural{" "}
                        <span className="font-medium text-foreground">
                          Genesis
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        Our fastest model for general use cases.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="explorer">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Bird className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Neural{" "}
                        <span className="font-medium text-foreground">
                          Explorer
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        Performance and speed for efficiency.
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="quantum">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Turtle className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        Neural{" "}
                        <span className="font-medium text-foreground">
                          Quantum
                        </span>
                      </p>
                      <p className="text-xs" data-description>
                        The most powerful model for complex computations.
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="temperature">Temperature</Label>
            <Input id="temperature" type="number" placeholder="0.4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="top-p">Top P</Label>
              <Input id="top-p" type="number" placeholder="0.7" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="top-k">Top K</Label>
              <Input id="top-k" type="number" placeholder="0.0" />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue="system">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="You are a..."
              className="min-h-[9.5rem]"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
