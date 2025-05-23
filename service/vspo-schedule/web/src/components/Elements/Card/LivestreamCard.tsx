import { formatDate, getLiveStatus } from "@/lib/utils";
import { Livestream } from "@/types/streaming";
import { Avatar, CardContent, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { PlatformIcon } from "../Icon";
import { VideoCard } from "./VideoCard";

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  paddingRight: "1em",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    paddingRight: "0.8em",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: "1 0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    padding: "12px",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  [theme.breakpoints.down("sm")]: {
    width: 36,
    height: 36,
  },
}));

const HiddenOnSm = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const FontSizeOnTypography = styled(Typography)(
  ({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  }),
  ({ title }) => ({
    marginLeft: title?.startsWith("【") ? "-10px" : 0,
  }),
);

type LivestreamCardProps =
  | {
      livestream: Livestream;
      isFreechat: false;
      timeZone: string;
    }
  | {
      livestream: Livestream;
      isFreechat: true;
    };

export const LivestreamCard: React.FC<LivestreamCardProps> = (props) => {
  const { livestream, isFreechat } = props;
  const { t } = useTranslation("common");
  const theme = useTheme();
  const { title, channelTitle, scheduledStartTime, iconUrl, platform } =
    livestream;
  const livestreamStatus = useMemo(
    () => getLiveStatus(livestream),
    [livestream],
  );
  const cardHighlight =
    livestreamStatus === "live" || livestreamStatus === "upcoming"
      ? {
          label: t(`liveStatus.${livestreamStatus}`),
          color:
            theme.vars.palette.customColors.videoHighlight[livestreamStatus],
          bold: true,
        }
      : undefined;

  return (
    <VideoCard video={livestream} highlight={cardHighlight}>
      <StyledCardContent>
        <div>
          <FontSizeOnTypography variant="h5" noWrap title={title}>
            {title}
          </FontSizeOnTypography>
          <HiddenOnSm>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{ color: "text.secondary" }}
            >
              {channelTitle}
            </Typography>
          </HiddenOnSm>
        </div>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {!isFreechat && (
            <ResponsiveTypography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                paddingTop: "7px",
              }}
            >
              <Typography
                component="span"
                sx={{
                  paddingTop: "3px",
                  paddingRight: "3px",
                }}
              >
                {formatDate(scheduledStartTime, "HH:mm", {
                  timeZone: props.timeZone,
                })}
                ~
              </Typography>
              <PlatformIcon platform={platform} />
            </ResponsiveTypography>
          )}
          <StyledAvatar src={iconUrl} alt={channelTitle} />
        </Box>
      </StyledCardContent>
    </VideoCard>
  );
};
