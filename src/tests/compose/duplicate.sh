original_file="$1"
folder="$2"
count="$3"

# Validate command-line arguments
if [[ -z "$original_file" || -z "$folder" || -z "$count" ]]; then
  echo "Usage: $0 <original_file> <folder> <count>"
  exit 1
fi

# Extract the section of the original filename between 'leak1' and '.spec'
filename=$(basename "$original_file")
regex="leak1\.(.*)\.spec"
if [[ "$filename" =~ $regex ]]; then
  word="${BASH_REMATCH[1]}"
else
  echo "Invalid original file name format"
  exit 1
fi

# Delete only hard links in the folder (excluding the original file)
find "$folder" -type f ! -samefile "$original_file" -links +1 -exec rm {} +

# Create new hard links with an incremental count and reinstated word
for ((i=2; i<=count+1; i++)); do
  new_filename="leak${i}.${word}.spec.ts"
  if ln -Pf "$original_file" "$folder/$new_filename"; then
    echo "Created hard link: $folder/$new_filename"
  else
    echo "Failed to create hard link: $folder/$new_filename"
  fi
done




