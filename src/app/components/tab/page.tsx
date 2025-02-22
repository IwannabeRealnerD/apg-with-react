"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

import { tabInfoArr } from "./constant";

type GenreType = (typeof tabInfoArr)[number]["genre"];

const TabPage = () => {
  const [activeMenu, setActiveMenu] = useState<GenreType>("Tourer");
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const tabRefList: MutableRefObject<Map<number, HTMLButtonElement>> = useRef(new Map());

  useEffect(() => {
    if (focusIndex === null) {
      return undefined;
    }

    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const nextIndex = focusIndex + 1 === tabInfoArr.length ? 0 : focusIndex + 1;
        setFocusIndex(nextIndex);
        setActiveMenu(tabInfoArr[nextIndex].genre);
        tabRefList.current.get(nextIndex)?.focus();
        return;
      }
      if (e.key === "ArrowLeft") {
        const nextIndex = focusIndex === 0 ? tabInfoArr.length - 1 : focusIndex - 1;
        setFocusIndex(nextIndex);
        setActiveMenu(tabInfoArr[nextIndex].genre);
        tabRefList.current.get(nextIndex)?.focus();
      }
    };
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [focusIndex]);

  return (
    <main className="flex w-full flex-col">
      <h2>BMW Motorrad</h2>
      <div role="tablist">
        {tabInfoArr.map(({ genre }, index) => {
          const isSelected = genre === activeMenu;
          return (
            <button
              key="tab"
              ref={(domNode) => {
                if (domNode) {
                  tabRefList.current.set(index, domNode);
                  return;
                }
                tabRefList.current.delete(index);
              }}
              aria-controls={`tabpanel-${index + 1}`}
              aria-selected={isSelected}
              id={`tab-${index + 1}`}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
              onBlur={() => setFocusIndex(null)}
              onClick={() => {
                setActiveMenu(genre);
              }}
              onFocus={() => setFocusIndex(index)}
            >
              {genre}
            </button>
          );
        })}
      </div>
      {tabInfoArr.map(({ genre, desc }, index) => {
        const isSelected = genre === activeMenu;
        const key = `tabpanel-${index + 1}`;
        return (
          <div
            key={key}
            aria-label="에 대한 설명"
            aria-labelledby={`tab-${index + 1} ${key}`}
            hidden={!isSelected}
            id={key}
            role="tabpanel"
            tabIndex={0}
          >
            <p>{desc}</p>
          </div>
        );
      })}
    </main>
  );
};

export default TabPage;
