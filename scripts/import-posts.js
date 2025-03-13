const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, '..', '..', 'old_stuff', 'source', '_posts');
const destDir = path.join(__dirname, '..', 'src', 'content', 'posts');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Read all markdown files from source directory
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.md'));

// Process each file
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  // Read file content
  const content = fs.readFileSync(sourcePath, 'utf8');
  
  // Copy file to destination
  fs.writeFileSync(destPath, content);
  
  console.log(`Imported: ${file}`);
});

console.log(`\nImported ${files.length} posts from ${sourceDir} to ${destDir}`); 