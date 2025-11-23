#!/usr/bin/env node
/**
 * Post-install script to copy prebuilt sharp binary
 * This workaround is needed because the build environment has proxy restrictions
 * that prevent sharp from downloading binaries during installation.
 */

const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../node_modules/@img/sharp-linux-x64/lib/sharp-linux-x64.node');
const targetDir = path.join(__dirname, '../node_modules/sharp/build/Release');
const targetPath = path.join(targetDir, 'sharp-linux-x64.node');

try {
  // Check if source file exists
  if (!fs.existsSync(sourcePath)) {
    console.log('Sharp prebuilt binary not found, skipping copy...');
    process.exit(0);
  }

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy the binary
  fs.copyFileSync(sourcePath, targetPath);
  console.log('Successfully copied sharp binary to', targetPath);
} catch (error) {
  console.error('Warning: Failed to copy sharp binary:', error.message);
  // Don't fail the installation
  process.exit(0);
}
