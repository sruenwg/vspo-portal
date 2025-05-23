import { TweetEmbed } from "@/components/Elements";
import { ContentLayout } from "@/components/Layout";
import { DEFAULT_LOCALE, TEMP_TIMESTAMP } from "@/lib/Const";
import { fetchEvents } from "@/lib/api";
import { convertToUTCDate } from "@/lib/dayjs";
import {
  formatDate,
  generateStaticPathsForLocales,
  getRelevantMembers,
} from "@/lib/utils";
import { VspoEvent } from "@/types/events";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";

type Params = {
  id: string;
};

type Props = {
  event: VspoEvent;
  id: string;
  meta: {
    title: string;
    description: string;
  };
};

// https://nextjs.org/docs/pages/building-your-application/routing/internationalization#how-does-this-work-with-static-generation
export const getStaticPaths: GetStaticPaths<Params> = async ({ locales }) => {
  try {
    // FIXME: lang should be passed from the context
    const fetchedEvents = await fetchEvents({ lang: "ja" });
    const paths = generateStaticPathsForLocales(
      fetchedEvents
        .filter((f) => !f.isNotLink)
        .map((event) => ({ params: { id: event.newsId } })),
      locales,
    );

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
  locale = DEFAULT_LOCALE,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const fetchedEvents = await fetchEvents({ lang: locale });
  if (!Array.isArray(fetchedEvents)) {
    return {
      notFound: true,
    };
  }
  const event = fetchedEvents.find((event) => event.newsId === params.id);
  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "events"])),
      event: event,
      id: params.id,
      meta: {
        title: event.title,
        description: event?.contentSummary || event.title,
      },
    },
  };
};

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  [theme.breakpoints.down("sm")]: {
    width: 28,
    height: 28,
  },
}));

const EventPage: NextPageWithLayout<Props> = ({ event }) => {
  const router = useRouter();
  const { t } = useTranslation(["common"]);
  const locale = router.locale ?? DEFAULT_LOCALE;

  if (!event) {
    return null;
  }
  return (
    <>
      <Toolbar disableGutters>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
          {t("back", { ns: "common" })}
        </Button>
      </Toolbar>

      <Box>
        <Typography variant="h4" sx={{ marginBottom: "10px" }}>
          {event.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography sx={{ color: "text.secondary" }}>
            {formatDate(
              convertToUTCDate(event.startedAt.split("T")[0] || TEMP_TIMESTAMP),
              "MM/dd (E)",
              { localeCode: locale },
            )}
          </Typography>
          {getRelevantMembers(event.contentSummary).map((member, index) => (
            <StyledAvatar key={index} alt={member.name} src={member.iconUrl} />
          ))}
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          {event.contentSummary.split("\n").map((line, index) => {
            return (
              <Typography key={index} variant="body1">
                {line}
                <br />
              </Typography>
            );
          })}
        </Box>
        {event.tweetLinks.map((link, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <TweetEmbed tweetLink={link} />
          </Box>
        ))}
        {event.webPageLinks.length > 0 && (
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Web Links:
            </Typography>
            {/* テキストを...にする */}
            {event.webPageLinks.map((link, index) => (
              <Link
                key={index}
                href={link}
                sx={{
                  display: "block",
                  marginBottom: "10px",
                  wordBreak: "break-all",
                }}
              >
                {link}
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

EventPage.getLayout = (page, pageProps) => (
  <ContentLayout
    title={pageProps.meta?.title}
    description={pageProps.meta?.description}
    path={`/events/details/${pageProps.id}`}
    maxPageWidth="md"
  >
    {page}
  </ContentLayout>
);

export default EventPage;
