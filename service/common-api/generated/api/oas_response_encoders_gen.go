// Code generated by ogen, DO NOT EDIT.

package api

import (
	"net/http"

	"github.com/go-faster/errors"
	"github.com/go-faster/jx"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
)

func encodeChannelsChannelIDVideosGetResponse(response ChannelsChannelIDVideosGetRes, w http.ResponseWriter, span trace.Span) error {
	switch response := response.(type) {
	case *VideosResponse:
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(200)
		span.SetStatus(codes.Ok, http.StatusText(200))

		e := new(jx.Encoder)
		response.Encode(e)
		if _, err := e.WriteTo(w); err != nil {
			return errors.Wrap(err, "write")
		}

		return nil

	case *ChannelsChannelIDVideosGetBadRequest:
		w.WriteHeader(400)
		span.SetStatus(codes.Error, http.StatusText(400))

		return nil

	case *ChannelsChannelIDVideosGetUnauthorized:
		w.WriteHeader(401)
		span.SetStatus(codes.Error, http.StatusText(401))

		return nil

	case *ChannelsChannelIDVideosGetForbidden:
		w.WriteHeader(403)
		span.SetStatus(codes.Error, http.StatusText(403))

		return nil

	case *ChannelsChannelIDVideosGetNotFound:
		w.WriteHeader(404)
		span.SetStatus(codes.Error, http.StatusText(404))

		return nil

	case *ChannelsChannelIDVideosGetInternalServerError:
		w.WriteHeader(500)
		span.SetStatus(codes.Error, http.StatusText(500))

		return nil

	default:
		return errors.Errorf("unexpected response type: %T", response)
	}
}

func encodeChannelsChannelIDVideosPostResponse(response ChannelsChannelIDVideosPostRes, w http.ResponseWriter, span trace.Span) error {
	switch response := response.(type) {
	case *VideosResponse:
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(200)
		span.SetStatus(codes.Ok, http.StatusText(200))

		e := new(jx.Encoder)
		response.Encode(e)
		if _, err := e.WriteTo(w); err != nil {
			return errors.Wrap(err, "write")
		}

		return nil

	case *ChannelsChannelIDVideosPostBadRequest:
		w.WriteHeader(400)
		span.SetStatus(codes.Error, http.StatusText(400))

		return nil

	case *ChannelsChannelIDVideosPostUnauthorized:
		w.WriteHeader(401)
		span.SetStatus(codes.Error, http.StatusText(401))

		return nil

	case *ChannelsChannelIDVideosPostForbidden:
		w.WriteHeader(403)
		span.SetStatus(codes.Error, http.StatusText(403))

		return nil

	case *ChannelsChannelIDVideosPostNotFound:
		w.WriteHeader(404)
		span.SetStatus(codes.Error, http.StatusText(404))

		return nil

	case *ChannelsChannelIDVideosPostInternalServerError:
		w.WriteHeader(500)
		span.SetStatus(codes.Error, http.StatusText(500))

		return nil

	default:
		return errors.Errorf("unexpected response type: %T", response)
	}
}

func encodeChannelsChannelIDVideosPutResponse(response ChannelsChannelIDVideosPutRes, w http.ResponseWriter, span trace.Span) error {
	switch response := response.(type) {
	case *VideosResponse:
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(200)
		span.SetStatus(codes.Ok, http.StatusText(200))

		e := new(jx.Encoder)
		response.Encode(e)
		if _, err := e.WriteTo(w); err != nil {
			return errors.Wrap(err, "write")
		}

		return nil

	case *ChannelsChannelIDVideosPutBadRequest:
		w.WriteHeader(400)
		span.SetStatus(codes.Error, http.StatusText(400))

		return nil

	case *ChannelsChannelIDVideosPutUnauthorized:
		w.WriteHeader(401)
		span.SetStatus(codes.Error, http.StatusText(401))

		return nil

	case *ChannelsChannelIDVideosPutForbidden:
		w.WriteHeader(403)
		span.SetStatus(codes.Error, http.StatusText(403))

		return nil

	case *ChannelsChannelIDVideosPutNotFound:
		w.WriteHeader(404)
		span.SetStatus(codes.Error, http.StatusText(404))

		return nil

	case *ChannelsChannelIDVideosPutInternalServerError:
		w.WriteHeader(500)
		span.SetStatus(codes.Error, http.StatusText(500))

		return nil

	default:
		return errors.Errorf("unexpected response type: %T", response)
	}
}

func encodeChannelsGetResponse(response ChannelsGetRes, w http.ResponseWriter, span trace.Span) error {
	switch response := response.(type) {
	case *ChannelsResponse:
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(200)
		span.SetStatus(codes.Ok, http.StatusText(200))

		e := new(jx.Encoder)
		response.Encode(e)
		if _, err := e.WriteTo(w); err != nil {
			return errors.Wrap(err, "write")
		}

		return nil

	case *ChannelsGetBadRequest:
		w.WriteHeader(400)
		span.SetStatus(codes.Error, http.StatusText(400))

		return nil

	case *ChannelsGetUnauthorized:
		w.WriteHeader(401)
		span.SetStatus(codes.Error, http.StatusText(401))

		return nil

	case *ChannelsGetForbidden:
		w.WriteHeader(403)
		span.SetStatus(codes.Error, http.StatusText(403))

		return nil

	case *ChannelsGetNotFound:
		w.WriteHeader(404)
		span.SetStatus(codes.Error, http.StatusText(404))

		return nil

	case *ChannelsGetInternalServerError:
		w.WriteHeader(500)
		span.SetStatus(codes.Error, http.StatusText(500))

		return nil

	default:
		return errors.Errorf("unexpected response type: %T", response)
	}
}

func encodeChannelsPostResponse(response ChannelsPostRes, w http.ResponseWriter, span trace.Span) error {
	switch response := response.(type) {
	case *ChannelsResponse:
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(200)
		span.SetStatus(codes.Ok, http.StatusText(200))

		e := new(jx.Encoder)
		response.Encode(e)
		if _, err := e.WriteTo(w); err != nil {
			return errors.Wrap(err, "write")
		}

		return nil

	case *ChannelsPostBadRequest:
		w.WriteHeader(400)
		span.SetStatus(codes.Error, http.StatusText(400))

		return nil

	case *ChannelsPostUnauthorized:
		w.WriteHeader(401)
		span.SetStatus(codes.Error, http.StatusText(401))

		return nil

	case *ChannelsPostForbidden:
		w.WriteHeader(403)
		span.SetStatus(codes.Error, http.StatusText(403))

		return nil

	case *ChannelsPostNotFound:
		w.WriteHeader(404)
		span.SetStatus(codes.Error, http.StatusText(404))

		return nil

	case *ChannelsPostInternalServerError:
		w.WriteHeader(500)
		span.SetStatus(codes.Error, http.StatusText(500))

		return nil

	default:
		return errors.Errorf("unexpected response type: %T", response)
	}
}

func encodeChannelsPutResponse(response ChannelsPutRes, w http.ResponseWriter, span trace.Span) error {
	switch response := response.(type) {
	case *ChannelsResponse:
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(200)
		span.SetStatus(codes.Ok, http.StatusText(200))

		e := new(jx.Encoder)
		response.Encode(e)
		if _, err := e.WriteTo(w); err != nil {
			return errors.Wrap(err, "write")
		}

		return nil

	case *ChannelsPutBadRequest:
		w.WriteHeader(400)
		span.SetStatus(codes.Error, http.StatusText(400))

		return nil

	case *ChannelsPutUnauthorized:
		w.WriteHeader(401)
		span.SetStatus(codes.Error, http.StatusText(401))

		return nil

	case *ChannelsPutForbidden:
		w.WriteHeader(403)
		span.SetStatus(codes.Error, http.StatusText(403))

		return nil

	case *ChannelsPutNotFound:
		w.WriteHeader(404)
		span.SetStatus(codes.Error, http.StatusText(404))

		return nil

	case *ChannelsPutInternalServerError:
		w.WriteHeader(500)
		span.SetStatus(codes.Error, http.StatusText(500))

		return nil

	default:
		return errors.Errorf("unexpected response type: %T", response)
	}
}
