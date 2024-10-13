// Code generated by ogen, DO NOT EDIT.

package api

import (
	"context"
)

// Handler handles operations described by OpenAPI v3 specification.
type Handler interface {
	// APICronChannelsGet implements GET /api/cron/channels operation.
	//
	// Update channels.
	//
	// GET /api/cron/channels
	APICronChannelsGet(ctx context.Context, params APICronChannelsGetParams) (APICronChannelsGetRes, error)
	// APICronCreatorsGet implements GET /api/cron/creators operation.
	//
	// Creates creators by fetching from Youtube using provided Channel IDs.
	//
	// GET /api/cron/creators
	APICronCreatorsGet(ctx context.Context, params APICronCreatorsGetParams) (APICronCreatorsGetRes, error)
	// APICronExistVideosGet implements GET /api/cron/exist_videos operation.
	//
	// Update exist videos.
	//
	// GET /api/cron/exist_videos
	APICronExistVideosGet(ctx context.Context, params APICronExistVideosGetParams) (APICronExistVideosGetRes, error)
	// APICronSearchVideosGet implements GET /api/cron/search_videos operation.
	//
	// Update videos related to a specific creator based on provided.
	//
	// GET /api/cron/search_videos
	APICronSearchVideosGet(ctx context.Context, params APICronSearchVideosGetParams) (APICronSearchVideosGetRes, error)
	// APIPingGet implements GET /api/ping operation.
	//
	// Returns a 200 status code if successful, or an error.
	//
	// GET /api/ping
	APIPingGet(ctx context.Context) (*APIPingGetOK, error)
	// PingPost implements POST /ping operation.
	//
	// Returns a 200 status code if successful, or an error.
	//
	// POST /ping
	PingPost(ctx context.Context) (*PingPostOK, error)
}

// Server implements http server based on OpenAPI v3 specification and
// calls Handler to handle requests.
type Server struct {
	h Handler
	baseServer
}

// NewServer creates new Server.
func NewServer(h Handler, opts ...ServerOption) (*Server, error) {
	s, err := newServerConfig(opts...).baseServer()
	if err != nil {
		return nil, err
	}
	return &Server{
		h:          h,
		baseServer: s,
	}, nil
}
