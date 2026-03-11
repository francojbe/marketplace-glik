'use client';

import { useEffect, useState } from 'react';

import { HttpTypes } from '@medusajs/types';

import { IconButton } from '@/components/atoms';
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { CloseIcon, HamburgerMenuIcon } from '@/icons';

export const MobileNavbar = ({
  categories,
  parentCategories
}: {
  categories: HttpTypes.StoreProductCategory[];
  parentCategories: HttpTypes.StoreProductCategory[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className="lg:hidden"
      data-testid="mobile-navbar"
    >
      <div
        onClick={() => setIsOpen(true)}
        data-testid="mobile-menu-toggle"
      >
        <HamburgerMenuIcon />
      </div>
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-20 h-full w-full bg-primary"
          data-testid="mobile-menu-drawer"
        >
          <div
            className="flex items-center justify-between border-b p-4"
            data-testid="mobile-menu-header"
          >
            <h2 className="heading-md uppercase text-primary">Menu</h2>
            <IconButton
              icon={<CloseIcon size={20} />}
              onClick={() => closeMenuHandler()}
              variant="icon"
              size="small"
              data-testid="mobile-menu-close-button"
            />
          </div>
          <div className="flex flex-col p-6 gap-6">
            <LocalizedClientLink href="/compra" onClick={closeMenuHandler} className="text-xl font-medium transition-colors hover:text-[#00d4aa]">
              Compra
            </LocalizedClientLink>
            <LocalizedClientLink href="/vende" onClick={closeMenuHandler} className="text-xl font-medium transition-colors hover:text-[#00d4aa]">
              Vende
            </LocalizedClientLink>
            <LocalizedClientLink href="/servicios" onClick={closeMenuHandler} className="text-xl font-medium transition-colors hover:text-[#00d4aa]">
              Servicios
            </LocalizedClientLink>
            <LocalizedClientLink href="/noticias" onClick={closeMenuHandler} className="text-xl font-medium transition-colors hover:text-[#00d4aa]">
              Noticias
            </LocalizedClientLink>
            <LocalizedClientLink href="/ayuda" onClick={closeMenuHandler} className="text-xl font-medium transition-colors hover:text-[#00d4aa]">
              Ayuda
            </LocalizedClientLink>
          </div>
        </div>
      )}
    </div>
  );
};
