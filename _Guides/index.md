---
title: "Guides"
---

{% assign guides = site.Guides | where_exp: 'guide', 'guide.url != page.url' %}
{% for guide in guides %}
  - [{{ guide.title }}]({{guide.url}})
{% endfor %}
