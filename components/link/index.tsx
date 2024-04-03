import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

type LinkProps = {
  href: string;
  children: string;
  styles: string;
  activeclass: string;
};

const ActiveLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const { pathname } = useRouter();
  let className = props.styles || "";
  let _defaultClass = `${className} text-gray-100`;

  if (pathname === props.href) {
    className = `${className} text-indigo-400 ${props.activeclass}`;
  } else {
    className = _defaultClass;
  }

  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
};

export default ActiveLink;
