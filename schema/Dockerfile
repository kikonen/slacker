FROM ruby:2.7.2

WORKDIR /app

ARG DOCKER_USER=docker \
    DOCKER_PW=password \
    DOCKER_UID=1000 \
    DOCKER_GID=100

# http://blog.siami.fr/diving-in-rails-the-request-handling
ENV RAILS_ENV=development \
    SCRIPT_NAME=/ui \
    RAILS_RELATIVE_URL_ROOT=/ui

ENV BUNDLE_PATH=/bundle/vendor \
    GEM_HOME=/bundle/vendor/ruby/2.7.0 \
    GEM_PATH=/bundle/vendor/ruby/2.7.0/bin \
    NODE_PATH=/node_modules \
    PATH=$PATH:/app/bin:/node_modules/.bin \
    EDITOR=vim

####################
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get install -y --no-install-recommends libpq-dev postgresql-client socat sudo grep less vim

RUN npm install --global yarn

RUN ln -sf /node_modules node_modules

####################
RUN echo "useradd -m ${DOCKER_USER} --uid=${DOCKER_UID} --gid=${DOCKER_GID}"
RUN useradd -m ${DOCKER_USER} --uid=${DOCKER_UID} --gid=${DOCKER_GID} && \
    echo "${DOCKER_USER}:${DOCKER_PW}" | chpasswd

RUN echo "docker ALL=(ALL:ALL) NOPASSWD: ALL" | tee /etc/sudoers.d/docker

USER ${DOCKER_UID}:${DOCKER_GID}

####################
ENTRYPOINT ["docker/docker-entrypoint.sh"]
