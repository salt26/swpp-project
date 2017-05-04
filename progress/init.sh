tmux \
    new-session -s new-session -n backend "python3 ../northfacebook_backend/manage.py runserver 0.0.0.0:8000" \; \
    new-window -n frontend "cd ../northfacebook_frontend; npm start" \; \
    new-window -n testWindow "./test.sh; sleep 3; tmux kill-session -t new-session"
