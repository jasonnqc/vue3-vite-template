#!/usr/bin/env bash
local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex='^[a-z0-9]+\_[a-z0-9\_]+$'

message="Branch $local_branch_name does not match the allowed pattern: [yourname]/[description]. Please rename and try again."

if [[ ! $local_branch_name =~ $valid_branch_regex ]]; then
    echo "$message"
    exit 1
fi

exit 0
