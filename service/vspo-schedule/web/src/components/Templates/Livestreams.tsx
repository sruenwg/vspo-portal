import {
  formatDate,
  getRelevantMembers,
  groupLivestreamsByTimeRange,
} from "@/lib/utils";
import { VspoEvent } from "@/types/events";
import { Livestream } from "@/types/streaming";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import React from "react";
import { Link, LivestreamCard } from "../Elements";

type Props = {
  livestreamsByDate: Record<string, Livestream[]>;
  eventsByDate: Record<string, VspoEvent[]>;
  timeZone: string;
  locale: string;
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.vars.palette.customColors.darkBlue,
  color: "white",
  fontWeight: "bold",
  borderRadius: "4px",

  [theme.getColorSchemeSelector("dark")]: {
    backgroundColor: theme.vars.palette.customColors.gray,
  },
}));

const DateTypography = styled(Typography)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  backgroundColor: theme.vars.palette.customColors.darkBlue,
  color: "white",
  fontWeight: "bold",
  padding: "0.75rem",
  borderRadius: "4px",
  whiteSpace: "pre-line",

  [theme.getColorSchemeSelector("dark")]: {
    backgroundColor: theme.vars.palette.customColors.gray,
  },
}));

const TimeRangeLabel = styled(Typography)(({ theme }) => ({
  width: "12rem",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: 600,
  textAlign: "center",
  backgroundColor: theme.vars.palette.customColors.darkBlue,
  borderRadius: "1.35rem",
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [theme.getColorSchemeSelector("dark")]: {
    backgroundColor: theme.vars.palette.customColors.gray,
  },
  [theme.breakpoints.down("md")]: {
    width: "10rem",
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("xs")]: {
    width: "8rem",
    fontSize: "1rem",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  [theme.breakpoints.down("sm")]: {
    width: 20,
    height: 20,
  },
}));

export const LivestreamCards: React.FC<Props> = ({
  livestreamsByDate,
  eventsByDate,
  timeZone,
  locale,
}) => {
  const { t } = useTranslation(["streams"]);
  const [expanded, setExpanded] = React.useState<boolean>(true);
  if (Object.keys(livestreamsByDate).length === 0) {
    return (
      <Box
        sx={{
          margin: "5rem 0",
        }}
      >
        <DateTypography variant="h5" sx={{ mb: 3 }}>
          {t("noLiveStreams")}
        </DateTypography>
      </Box>
    );
  }
  return (
    <>
      {Object.entries(livestreamsByDate).map(([date, livestreams]) => {
        const livestreamsByTimeRange = groupLivestreamsByTimeRange(
          livestreams,
          timeZone,
        );
        let events: VspoEvent[] = [];
        if (date in eventsByDate) {
          events = eventsByDate[date];
        }

        const formattedDate = formatDate(date, "MM/dd (E)", {
          localeCode: locale,
        });

        return (
          <Box
            key={date}
            sx={{
              marginTop: 6,
              marginBottom: "5rem",
            }}
          >
            {events.length > 0 && (
              <StyledAccordion
                sx={{ margin: "20px 0" }}
                expanded={expanded}
                onChange={() => setExpanded((prev) => !prev)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                >
                  <Typography
                    component="span"
                    variant="h5"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {t("events")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: "transparent" }}>
                  {events.map((event, eventIndex) => {
                    const eventMembers = getRelevantMembers(
                      event.contentSummary,
                    );
                    const eventTitle = (
                      <Typography sx={{ fontSize: "16px" }}>
                        ・{event.title}
                      </Typography>
                    );
                    return (
                      <Box
                        key={eventIndex}
                        sx={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "10px",
                          flexDirection: "column",
                        }}
                      >
                        {event.isNotLink ? (
                          eventTitle
                        ) : (
                          <Link href={`/events/details/${event.newsId}`}>
                            {eventTitle}
                          </Link>
                        )}
                        {eventMembers.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            {eventMembers.map((member, memberIndex) => (
                              <StyledAvatar
                                key={memberIndex}
                                alt={member.name}
                                src={member.iconUrl}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </AccordionDetails>
              </StyledAccordion>
            )}
            <DateTypography variant="h5" sx={{ mb: 3 }}>
              {t("streamsOnDate", { date: formattedDate })}
            </DateTypography>
            {livestreamsByTimeRange.map(
              ({ label, livestreams }) =>
                livestreams.length > 0 && (
                  <Box
                    key={label}
                    sx={{
                      marginBottom: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <TimeRangeLabel variant="h6">{label}</TimeRangeLabel>
                    <Grid container spacing={2} sx={{ width: "100%" }}>
                      {livestreams.map((livestream) => (
                        <Grid
                          size={{ xs: 6, sm: 6, md: 3, lg: 3 }}
                          key={livestream.id}
                        >
                          <LivestreamCard
                            livestream={livestream}
                            isFreechat={false}
                            timeZone={timeZone}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ),
            )}
          </Box>
        );
      })}
    </>
  );
};
