# Joshf26's Obsidian Map Fork
This fork adds the following features to obsidian-maps:
1. Multiple coordinate pairs per note using the following syntax:
```yaml
coordinates:
  - [lat1, lng1]
  - [lat2, lng2]
```
2. Default marker icon and color view options. Find these in the view options under "Markers".

# Original README

Requires [Obsidian 1.10](https://obsidian.md/changelog/2025-11-11-desktop-v1.10.3/). This project demonstrates the Obsidian Bases API that allows plugin developers to create new view types.

## Map view for Obsidian Bases

Adds a [map layout](https://help.obsidian.md/bases/views/map) to [Obsidian Bases](https://help.obsidian.md/bases) so you can display notes as an interactive map view.

![Map view for Obsidian Bases](/images/map-view.png)

- Dynamically display markers that match your filters.
- Use marker icons and colors defined by properties.
- Load custom background tiles.
- Define default zoom options.

See the [full documentation](https://help.obsidian.md/bases/views/map) on the Obsidian Help site.
