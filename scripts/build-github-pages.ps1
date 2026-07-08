# Build static site for GitHub Pages (PeakRoamTravel)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$BaseUrl = "https://trinhtu1997.github.io/PeakRoamTravel"
$GaviasBase = "https://gaviaspreview.com/wp/gowilds"
$MonaBase = "https://mona-tour.monamedia.net"

Set-Location $Root

Write-Host "==> Downloading missing assets..."

$assets = @(
    @{ Url = "$GaviasBase/wp-content/uploads/2022/12/logo-white.png"; Path = "wp-content/uploads/2022/12/logo-white.png" },
    @{ Url = "$GaviasBase/wp-content/uploads/2023/02/image-20.jpg"; Path = "wp-content/uploads/2023/02/image-20.jpg" },
    @{ Url = "$GaviasBase/wp-content/uploads/2023/02/image-21.jpg"; Path = "wp-content/uploads/2023/02/image-21.jpg" },
    @{ Url = "$GaviasBase/wp-content/uploads/2023/01/gallery-1.jpg"; Path = "wp-content/uploads/2023/01/gallery-1.jpg" },
    @{ Url = "$GaviasBase/wp-content/uploads/2023/01/gallery-2.jpg"; Path = "wp-content/uploads/2023/01/gallery-2.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/team-1.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/team-1.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/team-2.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/team-2.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/team-3.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/team-3.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/team-4.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/team-4.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/team-5.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/team-5.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/team-6.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/team-6.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/gallery-1.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/gallery-1.jpg" },
    @{ Url = "$GaviasBase/wp-content/plugins/gowilds-themer/elementor/assets/images/gallery-2.jpg"; Path = "wp-content/plugins/gowilds-themer/elementor/assets/images/gallery-2.jpg" },
    @{ Url = "$MonaBase/wp-content/uploads/revslider/slider-1/slider-11.jpg"; Path = "wp-content/uploads/revslider/slider-1/slider-11.jpg" },
    @{ Url = "$MonaBase/wp-content/uploads/revslider/slider-1/slider-21.jpg"; Path = "wp-content/uploads/revslider/slider-1/slider-21.jpg" },
    @{ Url = "$MonaBase/wp-content/uploads/revslider/slider-1/slider-31.jpg"; Path = "wp-content/uploads/revslider/slider-1/slider-31.jpg" },
    @{ Url = "$MonaBase/wp-content/uploads/revslider/slider-1/layer-11.png"; Path = "wp-content/uploads/revslider/slider-1/layer-11.png" },
    @{ Url = "$MonaBase/wp-content/uploads/revslider/slider-1/slider-11-50x100.jpg"; Path = "wp-content/uploads/revslider/slider-1/slider-11-50x100.jpg" },
    @{ Url = "$MonaBase/wp-content/uploads/revslider/slider-1/slider-21-50x100.jpg"; Path = "wp-content/uploads/revslider/slider-1/slider-21-50x100.jpg" },
    @{ Url = "$MonaBase/wp-content/uploads/revslider/slider-1/slider-31-50x100.jpg"; Path = "wp-content/uploads/revslider/slider-1/slider-31-50x100.jpg" },
    @{ Url = "$MonaBase/wp-content/uploads/2024/05/cropped-logo-mona-ft-1-270x270.png"; Path = "wp-content/uploads/2024/05/cropped-logo-mona-ft-1-270x270.png" }
)

foreach ($asset in $assets) {
    $dest = Join-Path $Root $asset.Path
    if (Test-Path $dest) {
        Write-Host "  skip (exists): $($asset.Path)"
        continue
    }
    $dir = Split-Path $dest -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    try {
        Invoke-WebRequest -Uri $asset.Url -OutFile $dest -UseBasicParsing -TimeoutSec 30
        Write-Host "  downloaded: $($asset.Path)"
    } catch {
        Write-Warning "  failed: $($asset.Url) - $($_.Exception.Message)"
    }
}

Write-Host "==> Fixing URLs in HTML/CSS/JS/JSON files..."

$pageMap = @{
    "about" = "$BaseUrl/about/index.html"
    "contact" = "$BaseUrl/contact/index.html"
    "news" = "$BaseUrl/news/index.html"
    "team" = "$BaseUrl/team/index.html"
    "tours-page" = "$BaseUrl/tours-page/index.html"
    "portfolio-01" = "$BaseUrl/portfolio-01/index.html"
    "gallery" = "$BaseUrl/gallery/index.html"
    "destination" = "$BaseUrl/destination/index.html"
}

$extensions = @("*.html", "*.css", "*.js", "*.json")
$files = Get-ChildItem -Path $Root -Recurse -Include $extensions |
    Where-Object { $_.FullName -notmatch '\\scripts\\' -and $_.FullName -notmatch '\\\.git\\' }

$changed = 0
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content

    # Protocol-relative mona-tour URLs
    $content = $content -replace '//mona-tour\.monamedia\.net/wp-content/', "$BaseUrl/wp-content/"
    $content = $content -replace '//mona-tour\.monamedia\.net/', "$BaseUrl/"

    # Absolute mona-tour URLs
    $content = $content -replace 'https:\\/\\/mona-tour\.monamedia\.net\\/wp-content\\/', "$BaseUrl/wp-content/".Replace('/', '\/')
    $content = $content -replace 'https://mona-tour\.monamedia\.net/wp-content/', "$BaseUrl/wp-content/"
    $content = $content -replace 'http://mona-tour\.monamedia\.net/wp-content/', "$BaseUrl/wp-content/"
    $content = $content -replace 'https://mona-tour\.monamedia\.net/', "$BaseUrl/"
    $content = $content -replace 'http://mona-tour\.monamedia\.net/', "$BaseUrl/"

    # Escaped JSON mona-tour URLs
    $content = $content -replace 'https:\\/\\/mona-tour\.monamedia\.net\\/', ($BaseUrl + '/').Replace('/', '\/')
    $content = $content -replace 'https:\\/\\/mona-tour\.monamedia\.net"', ($BaseUrl + '"').Replace('/', '\/')
    $content = $content -replace 'redirecturl\\":\\"https:\\/\\/mona-tour\.monamedia\.net\\"', ('redirecturl":"' + ($BaseUrl).Replace('/', '\/') + '"')

    # URL-encoded mona-tour references (oembed, social share links)
    $content = $content -replace 'mona-tour\.monamedia\.net', 'trinhtu1997.github.io/PeakRoamTravel'

    # Gavias absolute asset URLs
    $content = $content -replace 'https://gaviaspreview\.com/wp/gowilds/wp-content/uploads/', "$BaseUrl/wp-content/uploads/"
    $content = $content -replace 'https://gaviaspreview\.com/wp/gowilds/wp-content/plugins/', "$BaseUrl/wp-content/plugins/"
    $content = $content -replace 'https:\\/\\/gaviaspreview\.com\\/wp\\/gowilds\\/wp-content\\/uploads\\/', ($BaseUrl + '/wp-content/uploads/').Replace('/', '\/')
    $content = $content -replace 'https:\\/\\/gaviaspreview\.com\\/wp\\/gowilds\\/wp-content\\/plugins\\/', ($BaseUrl + '/wp-content/plugins/').Replace('/', '\/')

    # Gavias relative asset paths (HTTrack mirror artifacts)
    $content = $content -replace '(?:\.\./)*gaviaspreview\.com/wp/gowilds/wp-content/uploads/', "$BaseUrl/wp-content/uploads/"
    $content = $content -replace '(?:\.\./)*gaviaspreview\.com/wp/gowilds/wp-content/plugins/', "$BaseUrl/wp-content/plugins/"

    # Gavias page links -> local GitHub Pages routes
    foreach ($page in $pageMap.Keys) {
        $content = $content -replace "https://gaviaspreview\.com/wp/gowilds/$page/?", $pageMap[$page]
    }
    $content = $content -replace 'https://gaviaspreview\.com/wp/gowilds/?"', "$BaseUrl/`""
    $content = $content -replace 'https://gaviaspreview\.com/wp/gowilds', $BaseUrl

    # Fix homepage title
    if ($file.Name -eq "index.html" -and $file.DirectoryName -eq $Root) {
        $content = $content -replace '<title>&#8203;</title>', '<title>Peak Roam Travel</title>'
        $content = $content -replace '<meta property="og:title" content="" />', '<meta property="og:title" content="Peak Roam Travel" />'
        $content = $content -replace '<meta name="twitter:title" content="" />', '<meta name="twitter:title" content="Peak Roam Travel" />'
    }

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        $changed++
    }
}

# Remove broken HTTrack 404 stub
$stub = Join-Path $Root "uploads/2023/01/tour-11.html"
if (Test-Path $stub) {
    Remove-Item $stub -Force
    Write-Host "  removed broken stub: uploads/2023/01/tour-11.html"
}

# Ensure .nojekyll exists for GitHub Pages
$nojekyll = Join-Path $Root ".nojekyll"
if (-not (Test-Path $nojekyll)) {
    New-Item -ItemType File -Path $nojekyll -Force | Out-Null
}

Write-Host "==> Done. Updated $changed file(s)."
Write-Host "    Site URL: $BaseUrl/"
