#!/bin/bash

# 🎨 Warna Teks
bold=$(tput bold)
reset=$(tput sgr0)
red=$(tput setaf 1)
green=$(tput setaf 2)
yellow=$(tput setaf 3)
blue=$(tput setaf 4)
purple=$(tput setaf 5)
cyan=$(tput setaf 6)
white=$(tput setaf 7)

# 🎭 Animasi Loading
loading_animation() {
    local delay=0.1
    local spin=('🌑' '🌒' '🌓' '🌔' '🌕' '🌖' '🌗' '🌘')
    while :; do
        for frame in "${spin[@]}"; do
            echo -ne "${yellow}\r$frame Mengambil data dari GitHub... ${reset}"
            sleep $delay
        done
    done
}

# 🚀 Mulai Animasi Loading
loading_animation &
LOADING_PID=$!

# 🔍 Ambil daftar issue dari GitHub
ISSUES=$(gh issue list --assignee @me --limit 10 --json number,title --jq '.[] | "\(.number) - \(.title)"')

# 🎭 Hentikan Animasi Loading
kill $LOADING_PID
wait $LOADING_PID 2>/dev/null

# 🚨 Cek jika tidak ada issue
if [[ -z "$ISSUES" ]]; then
    echo "${red}🚨 Tidak ada issue yang tersedia. Silakan cek lagi.${reset}"
    exit 1
fi

# 🔄 Update daftar branch dari remote
echo "${cyan}🔄 Mengupdate daftar branch...${reset}"
git fetch origin > /dev/null 2>&1

REMOTE_BRANCHES=$(git branch -r | sed 's/origin\///' | awk '{$1=$1;print}')

# 📋 Tampilkan daftar issue yang tersedia
echo ""
echo "════════════════════════════════════════"
echo "  🎯 ${bold}${purple}Daftar Issue yang Bisa Dikerjakan${reset}"
echo "════════════════════════════════════════"

IFS=$'\n' read -rd '' -a ISSUES_ARRAY <<< "$ISSUES"
for i in "${!ISSUES_ARRAY[@]}"; do
    echo "  ${bold}${green}$((i+1)).${reset} ${yellow}${ISSUES_ARRAY[$i]}${reset}"
done

echo ""
read -p "🔢 ${cyan}Masukkan nomor issue yang ingin dikerjakan:${reset} " ISSUE_INDEX

# 🚨 Validasi input
if ! [[ "$ISSUE_INDEX" =~ ^[0-9]+$ ]] || (( ISSUE_INDEX < 1 || ISSUE_INDEX > ${#ISSUES_ARRAY[@]} )); then
    echo "${red}🚨 Pilihan tidak valid! Coba lagi.${reset}"
    exit 1
fi

# 📝 Ambil informasi issue yang dipilih
SELECTED_ISSUE="${ISSUES_ARRAY[$((ISSUE_INDEX-1))]}"
ISSUE_NUMBER=$(echo "$SELECTED_ISSUE" | awk -F ' - ' '{print $1}')
ISSUE_TITLE=$(echo "$SELECTED_ISSUE" | awk -F ' - ' '{print $2}')

# 🚀 Format nama branch
BRANCH_NAME=$(echo "$ISSUE_TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# 🔎 Cek apakah branch sudah ada di remote
MATCHING_BRANCH=$(echo "$REMOTE_BRANCHES" | grep -i "$BRANCH_NAME" | head -n 1)

# 🚨 Jika branch tidak ditemukan
if [[ -z "$MATCHING_BRANCH" ]]; then
    echo "${red}🚨 Branch untuk issue '${bold}$ISSUE_TITLE${reset}${red}' tidak ditemukan!${reset}"
    exit 1
fi

# 🔄 Cek apakah branch sudah ada di lokal
echo "${blue}🔄 Mengecek apakah branch '${bold}$MATCHING_BRANCH${reset}${blue}' sudah ada di lokal...${reset}"
if git show-ref --verify --quiet "refs/heads/$MATCHING_BRANCH"; then
    echo "${yellow}⚡ Branch sudah ada di lokal, berpindah...${reset}"
    git switch "$MATCHING_BRANCH"
else
    echo "${green}🌱 Branch belum ada di lokal, mendownload...${reset}"
    git checkout -t "origin/$MATCHING_BRANCH"
fi

# 🔄 Tarik update terbaru dari branch
echo "${yellow}🔄 Menarik update terbaru dari '${bold}$MATCHING_BRANCH${reset}${yellow}'...${reset}"
git pull origin "$MATCHING_BRANCH" > /dev/null 2>&1

# 🎉 Konfirmasi sukses
echo ""
echo "════════════════════════════════════════"
echo "  ${green}✨🎉 BERHASIL BERPINDAH KE BRANCH${reset}  🚀🎊"
echo "  ${bold}${cyan}$MATCHING_BRANCH${reset}"
echo "════════════════════════════════════════"
echo "${cyan}🛠️ Silakan mulai bekerja pada issue ini!${reset}"
