#!/bin/bash

# Convert all JPG images to WebP format for better performance
# Quality set to 85 for good balance between size and quality

echo "Starting WebP conversion..."
cd "$(dirname "$0")"

count=0
total=0

# Count total files first
for i in {1..256}; do
    if [ -f "couple_$i.jpg" ]; then
        total=$((total + 1))
    fi
done

echo "Found $total JPG files to convert..."

# Convert each JPG to WebP
for i in {1..256}; do
    if [ -f "couple_$i.jpg" ] && [ ! -f "couple_$i.webp" ]; then
        echo "Converting couple_$i.jpg..."
        cwebp -q 85 "couple_$i.jpg" -o "couple_$i.webp"
        if [ $? -eq 0 ]; then
            count=$((count + 1))
            echo "✓ Converted couple_$i.jpg ($count/$total)"
        else
            echo "✗ Failed to convert couple_$i.jpg"
        fi
    fi
done

echo ""
echo "Conversion complete! Converted $count files to WebP format."
echo "Total WebP files now: $(ls -1 *.webp 2>/dev/null | wc -l)"
