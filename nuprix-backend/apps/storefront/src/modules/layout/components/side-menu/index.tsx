"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center gap-1.5 transition-all ease-out duration-200 focus:outline-none text-nuprix-muted hover:text-nuprix-forest font-medium text-sm"
                >
                  <span className="flex flex-col gap-1 w-4">
                    <span className="h-0.5 w-full bg-current rounded-full" />
                    <span className="h-0.5 w-full bg-current rounded-full" />
                  </span>
                  <span className="hidden xsmall:inline">Catalog</span>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-nuprix-forest/30 backdrop-blur-sm pointer-events-auto transition-opacity"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-4"
              >
                <PopoverPanel className="flex flex-col fixed top-0 left-0 w-full sm:w-80 h-full z-[51] bg-nuprix-ivory border-r border-nuprix-line shadow-2xl p-6 justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-nuprix-line" id="xmark">
                      <LocalizedClientLink
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold tracking-tight text-nuprix-forest"
                        onClick={close}
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-nuprix-forest text-xs font-bold text-nuprix-ivory">
                          N
                        </span>
                        <span className="font-display tracking-tight text-xl lowercase">nuprix</span>
                      </LocalizedClientLink>
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        aria-label="Close menu"
                        className="p-1 rounded-full text-nuprix-muted hover:text-nuprix-forest hover:bg-nuprix-mist transition-colors"
                      >
                        <XMark />
                      </button>
                    </div>

                    <ul className="flex flex-col gap-5 mt-8">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-2xl font-display font-medium text-nuprix-forest hover:text-nuprix-pine transition-colors"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-y-4 pt-6 border-t border-nuprix-line">
                    {!!locales?.length && (
                      <div
                        className="flex justify-between items-center text-sm text-nuprix-muted"
                        onMouseEnter={languageToggleState.open}
                        onMouseLeave={languageToggleState.close}
                      >
                        <LanguageSelect
                          toggleState={languageToggleState}
                          locales={locales}
                          currentLocale={currentLocale}
                        />
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            languageToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    )}
                    <div
                      className="flex justify-between items-center text-sm text-nuprix-muted"
                      onMouseEnter={countryToggleState.open}
                      onMouseLeave={countryToggleState.close}
                    >
                      {regions && (
                        <CountrySelect
                          toggleState={countryToggleState}
                          regions={regions}
                        />
                      )}
                      <ArrowRightMini
                        className={clx(
                          "transition-transform duration-150",
                          countryToggleState.state ? "-rotate-90" : ""
                        )}
                      />
                    </div>
                    <Text className="text-xs text-nuprix-subtle pt-2">
                      © {new Date().getFullYear()} Nuprix. All rights reserved.
                    </Text>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
