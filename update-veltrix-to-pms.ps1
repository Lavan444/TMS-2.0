# PowerShell script to replace Veltrix with Pms in specific files
$files = @(
    "src\common\data\projects.js",
    "src\common\data\invoices.js",
    "src\assets\scss\icons.scss"
)

foreach ($file in $files) {
    $fullPath = "d:\React\PMS2-1.0.code\PMS2-1.0\$file"
    if (Test-Path $fullPath) {
        Write-Host "Updating $file..."
        $content = Get-Content $fullPath -Raw
        $updatedContent = $content -replace "Veltrix", "Pms"
        $updatedContent | Set-Content $fullPath -NoNewline
        Write-Host "✅ Updated $file"
    } else {
        Write-Host "❌ File not found: $file"
    }
}

Write-Host "🎯 Replacement complete!"
