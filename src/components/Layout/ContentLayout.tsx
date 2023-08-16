import * as React from "react";

import { CustomHead } from "../Head/Head";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GoogleAd } from "../Elements/Google/GoogleAd";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  lastUpdateDate?: string;
  description?: string;
  path?: string;
  footerMessage?: string;
};

export const ContentLayout = ({
  children,
  title,
  lastUpdateDate,
  description,
  path,
  footerMessage,
}: ContentLayoutProps) => {
  return (
    <>
      <CustomHead title={title} description={description} path={path} />
      <Header title={title} />
      <main>{children}</main>
      <GoogleAd />
      <Footer lastUpdateDate={lastUpdateDate} description={footerMessage} />
    </>
  );
};
