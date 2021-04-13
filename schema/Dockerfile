FROM ruby:2.7.2

WORKDIR /app

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev


COPY Gemfile* /app
RUN bundle install
