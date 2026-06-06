const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'src', 'routes', 'admin');

function traverseAndReplace(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseAndReplace(fullPath);
        } else if (fullPath.endsWith('.svelte')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content
                .replace(/bg-zinc-950/g, 'bg-[#0a0a0a]')
                .replace(/bg-zinc-900/g, 'bg-[#111]')
                .replace(/text-red-600/g, 'text-[#990000]')
                .replace(/bg-red-600/g, 'bg-[#990000]')
                .replace(/text-red-500/g, 'text-[#990000]')
                .replace(/bg-red-500/g, 'bg-[#990000]')
                .replace(/border-red-500/g, 'border-[#990000]')
                .replace(/text-gray-400/g, 'text-zinc-400')
                .replace(/text-gray-500/g, 'text-zinc-500')
                .replace(/text-gray-300/g, 'text-zinc-300')
                .replace(/text-gray-200/g, 'text-zinc-200')
                .replace(/bg-blue-600/g, 'bg-[#111]')
                .replace(/hover:bg-blue-700/g, 'hover:bg-[#990000]')
                .replace(/bg-green-600/g, 'bg-[#111]')
                .replace(/text-blue-500/g, 'text-zinc-300')
                .replace(/border-blue-500/g, 'border-[#990000]')
                .replace(/text-green-500/g, 'text-zinc-300')
                .replace(/border-green-500/g, 'border-[#990000]')
                .replace(/bg-red-600\/10/g, 'bg-[#990000]/10')
                .replace(/hover:bg-red-600\/20/g, 'hover:bg-[#990000]/20')
                .replace(/border-red-500\/20/g, 'border-[#990000]/20')
                .replace(/bg-blue-500\/10/g, 'bg-zinc-800')
                .replace(/text-blue-400/g, 'text-white')
                .replace(/bg-yellow-500\/10/g, 'bg-zinc-800')
                .replace(/text-yellow-400/g, 'text-zinc-300')
                .replace(/bg-purple-500\/10/g, 'bg-zinc-800')
                .replace(/text-purple-400/g, 'text-zinc-300');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

traverseAndReplace(directoryPath);
console.log('Finished updating admin colors.');
