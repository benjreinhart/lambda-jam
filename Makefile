BIN = node_modules/.bin
SRCDIR = ./macro
TESTDIR = ./test

MOCHA = $(BIN)/mocha
SJS = $(BIN)/sjs

all: test

test: build-test
	@$(MOCHA) --reporter spec --recursive --colors

build-test:
	@$(SJS) --module $(SRCDIR)/index.js $(TESTDIR)/macro_test.sjs -o $(TESTDIR)/macro_test.js
