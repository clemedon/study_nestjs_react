#!/bin/bash

##
##   UTILS
##

fictive_name() {
    local vowels=("a" "e" "i" "o" "u")
    local consonants=("b" "c" "d" "f" "g" "h" "j" "k" "l" "m" "n" "p" "q" "r" "s" "t" "v" "w" "x" "y" "z")
    local name=""
    for i in {1..6}; do
        if ((i % 2 == 0)); then
            local random_vowel_index=$((RANDOM % ${#vowels[@]}))
            name+="${vowels[random_vowel_index]}"
        else
            local random_consonant_index=$((RANDOM % ${#consonants[@]}))
            name+="${consonants[random_consonant_index]}"
        fi
    done
    local capitalized_name="${name^}"  # Uppercase the first letter
    echo "$capitalized_name"
}

##
##   REQUESTS
##

todos_delete() {
    curl -i -X DELETE http://localhost:3000/todos/1
}

todos_patch() {
    json_data='{
    "title": "'"$(fictive_name)"'",
    "description": "PATCH"
}'
curl -i -H "Content-Type: application/json" \
    -X PATCH -d "$json_data" \
    http://localhost:3000/todos/1
}

todos_post() {
    json_data='{
    "id": 4,
    "title": "'"$(fictive_name)"'",
    "description": "POST",
    "done": true
}'
curl -i -H "Content-Type: application/json" \
    -X POST -d "$json_data" \
    http://localhost:3000/todos
}

todos_get() {
    curl -s http://localhost:3000/todos | jq
}

##
##   MAIN
##

main() {
    if [ -n "$1" ]; then
        choice="$1"
    else
        echo "Select an option:"
        echo "0: Send todos GET request"
        echo "1: Send todos POST request"
        echo "2: Send todos PATCH request"
        echo "2: Send todos DELETE request"
        read -p "> " choice
    fi

    if [ "$choice" = "0" ]; then
        todos_get
    elif [ "$choice" = "1" ]; then
        todos_post
    elif [ "$choice" = "2" ]; then
        todos_patch
    elif [ "$choice" = "3" ]; then
        todos_delete
    else
        echo "Invalid choice. Please enter 0 or 1."
    fi
}

main "$1"
