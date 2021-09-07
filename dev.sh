#!/usr/bin/env bash

tmux new-session -d -n Flat9 npm run dev
tmux split-window -h npm run sass
tmux split-window -v live-server www
tmux split-window -v
tmux -2 attach-session -d
