---
layout: base
permalink: /
---

{% comment %} Get the next stream. {% endcomment %}
{% include 1-tools/sort-videos.html videos=site.Streams future=true reverse=true %}
{% assign nextStream = out_sortedVideos | where_exp: 'stream', 'stream.date >= site.time' | first %}

{% comment %} Get latest coding challenges. {% endcomment %}
{% include 1-tools/sort-videos.html videos=site.CodingChallenges reverse=true %}

{% comment %} Use the latest coding challenge if a stream hasn't been scheduled yet. {% endcomment %}
{% if nextStream == null %}
  {% assign offset = 1 %}
  {% assign nextStream = out_sortedVideos | first %}
{% else %}
  {% assign offset = 0 %}
{% endif %}

{% assign featuredVideos = '' | split: '' %}

{% comment %} Add latest coding challenges to featured videos array. {% endcomment %}
{% for challenge in out_sortedVideos limit:2 offset:offset %}
  {% assign featuredVideos = featuredVideos | push: challenge %}
{% endfor %}

{% comment %} Get lastest stream and add it to the featured videos array. {% endcomment %}
{% include 1-tools/sort-videos.html videos=site.Streams reverse=true %}
{% assign featuredVideos = featuredVideos | push: out_sortedVideos[0] %}

<div class="landing-page">
  <div class="welcome-message">
    <div class="learn-to-code">
      <h1>Learn to Code</h1>
      <p>Daniel Shiffman makes videos on how to code!</p>
      <p>The Coding Train features "creative coding" video tutorials with new ones released every week.</p>
      <div class="ctas">
        <a href="{{ site.links.youtube }}?sub_confirmation=1" target="_blank" class="youtube">Subscribe on YouTube</a>
        <a href="{{ site.links.patreon }}" target="_blank" class="patreon">Become a Patron</a>
      </div>
    </div>

    {% include 3-modules/video-card.html video=nextStream %}

  </div>

  <h2>Latest Videos</h2>
  <div class="featured-videos">
    {% include 3-modules/video-list.html sortedVideos=featuredVideos %}
    <a href="{{ site.links.youtube }}" target="_blank" class="more-videos">Watch more videos</a>
  </div>

  <h2>Support The Coding Train</h2>
  <div class="support">
    {% capture patreonLogo %}{% include 4-vector-graphics/patreon.svg %}{% endcapture %}
    {% include 3-modules/hero-item.html image=patreonLogo title='Consider supporting?' content='Support The Coding Train on Patreon and get some awesome rewards!' url=site.links.patreon cta='Become a Patron' class='patreon' %}

    {% capture merchStoreImage %}<img alt='The Coding Train Merchandise Store' src="{{ '/assets/images/merch-store.png' | relative_url }}" />{% endcapture %}
    {% include 3-modules/hero-item.html image=merchStoreImage title='Want more of The Coding Train in your life?' content='Visit the merch store and get some shirts, mugs and more!' url=site.links.merch cta='Get some merch' class='merch-store' %}

    {% capture amazonStoreImage %}<img alt='The Coding Train Amazon Store' src="{{ '/assets/images/amazon-store.png' | relative_url }}" />{% endcapture %}
    {% include 3-modules/hero-item.html image=amazonStoreImage title="Haven't learned enough?" content='Read one of the books featured on The Coding Train!' url=site.links.amazon cta='Start reading' class='amazon-store' %}
  </div>
</div>
