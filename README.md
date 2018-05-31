# FaultFixers JS lib

Provides some common code that can be used across different FaultFixers projects.

## Install

```
yarn
```

## Development

Set up the Git pre-commit hook to prevent committing simple mistakes:

```
ln -s ../../bin/pre-commit .git/hooks/pre-commit
```

## Use

The examples below show how to use the function `getTicketCommentVisibilityDescription`.

In browsers:

```
window.faultfixersLib.getTicketCommentVisibilityDescription(ticket, 'PUBLIC');
```

In Node/React:

```
import {getTicketCommentVisibilityDescription} from 'faultfixers-js-lib';
getTicketCommentVisibilityDescription(ticket, 'PUBLIC');
```
