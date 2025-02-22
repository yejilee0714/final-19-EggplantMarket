//피드벡 반영2
const url = "https://api.mandarin.weniv.co.kr";
const myAccountName = localStorage.getItem("user-accountname");

async function getData() {
    const res = await fetch(url + "/post/feed/", {

        method: "GET",
        headers: {
            //토큰 받아와야함(O)
            "Authorization": `Bearer ${localStorage.getItem("user-token")}`,
            "Content-Type": "application/json"
        },
    });
    const resJson = await res.json();
    return resJson.posts;
}

async function postFeed() {
    const postsData = await getData();

    //팔로우 있을경우 없을경우 보여주는 창 다르게 구현(O)
    if (postsData.length > 0) {
        document.querySelector('.home-withoutfollower').style.display = 'none';
        document.querySelector('.home-withfollower').style.display = '';
        console.log('한명이상있어요')
        let writeTime = postsData[0].createdAt.split('-');
        let year = writeTime[0];
        let month = writeTime[1];
        let day = writeTime[2].substr(0, 2);
        console.log(postsData)

        const ulNode = document.querySelector('.home-post-list')

        for (let i = 0; i < postsData.length; i++) {
            const item = postsData[i];

            //수정해보는중
            const liNode = document.createElement('li');
            const divNode = document.createElement('div');
            liNode.innerHTML = `
            <section class="home-post">
                        <h2 class="a11y-hidden">사진과 글을 함께 올리는 게시물</h2>
                        <section class="user-follow">
                            <h3 class="a11y-hidden">유저정보</h3>
                            <a class="profile-img img-cover" href="./profile_info.html?accountName=${item.author.accountname}" tabindex="1">
                                <img src="${item.author.image}" alt="프로필사진">
                            </a>
                            <a class="user-info" href="./profile_info.html?accountName=${item.author.accountname}" tabindex="1">
                                <p class="user-name">${item.author.username}</p>
                                <p class="user-id">${item.author.accountname}</p>
                            </a>
                        </section>
                        <section class="post-edit">
                            <h4 class="a11y-hidden">게시물의 사진과 내용</h4>
                            <a href = "./post_detail.html?postId=${item.id}" tabindex="1">
                                </a>
                                <div class="post-icon">
                                    <button class="btn-like">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.9202 4.01346C16.5204 3.60579 16.0456 3.28239 15.5231 3.06175C15.0006 2.8411 14.4406 2.72754 13.875 2.72754C13.3094 2.72754 12.7494 2.8411 12.2268 3.06175C11.7043 3.28239 11.2296 3.60579 10.8298 4.01346L9.99997 4.85914L9.17017 4.01346C8.36252 3.19037 7.26713 2.72797 6.12495 2.72797C4.98277 2.72797 3.88737 3.19037 3.07973 4.01346C2.27209 4.83655 1.81836 5.9529 1.81836 7.11693C1.81836 8.28095 2.27209 9.3973 3.07973 10.2204L3.90953 11.0661L9.99997 17.273L16.0904 11.0661L16.9202 10.2204C17.3202 9.81291 17.6376 9.32909 17.8541 8.79659C18.0706 8.26409 18.182 7.69333 18.182 7.11693C18.182 6.54052 18.0706 5.96977 17.8541 5.43726C17.6376 4.90476 17.3202 4.42095 16.9202 4.01346Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg><span class="cnt">${item.heartCount}</span>
                                    </button>
                                    <a class="btn-comment" href = "./post_detail.html?postId=${item.id}" tabindex="1">
                                        <img src="../assets/icon/icon-message-circle.svg" alt="댓글 버튼"><span class="cnt">${item.commentCount}</span>
                                    </a>
                                </div>
                                <p class="post-date">${year}년 ${month}월 ${day}일</p>
                            </section>
                            <button class="btn-option"><img src="../assets/icon/icon-more-vertical.svg" alt="더보기 버튼"></button>
                    </section>`
            // <p class="post-text">${item.content}</p>
            //             <img class="post-img" src="${item.image}" alt="게시물 사진"></img>
            if (item.content) {
                liNode.querySelector('.post-edit a').insertAdjacentHTML('afterbegin', `<p class="post-text">${item.content}</p>`)
            }
            if (item.image) {
                liNode.querySelector('.post-edit a').insertAdjacentHTML('beforeend', `<div class="img-cover"><img class="post-img" src="${item.image}" alt="게시물 사진"></img></div>`)
            }
            ulNode.appendChild(liNode)

        }
    }
    handleModal()
}

postFeed();