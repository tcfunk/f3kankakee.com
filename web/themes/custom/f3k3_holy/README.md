# HOLY - atomic theme

- Holy is a startup theme for your project.
- It respects Brad Frost atomic design: https://bradfrost.com/blog/post/atomic-web-design/

# DRUPAL WAY

- Its based on the Classy theme.
- The goal is to style standard profile installation.

# CUSTOM THEME

1. Copy folder: themes/contrib/holy -> themes/custom/holy

2. Install NPM

	You have to install Node JS (https://nodejs.org) to your computer.

	```bash
	> cd themes/custom/holy
	> npm install
	```

3. Edit holy theme description for better orientation.

	themes/custom/holy/holy.info.yml

	```bash
	description: 'Custom theme'
	```

4. Ready for enable custom theme.

# GENERATE THEME STYLES

Use gulp to generate and update styles.

```bash
> cd themes/custom/holy
> gulp
```

# GENERATE DOCUMENTATION

Use gulp to generate and update documentation.

```bash
> cd themes/custom/holy/styleguides
> gulp
```

Documentation address:
https://www.YOUR_DOMAIN.com/themes/custom/holy/styleguides/atoms.phtml

example: https://holy.redweb.cz/themes/custom/holy/styleguides/atoms.phtml

NOTES:
- Running gulp again will update the files and add missing ones.
- For re-work delete folder: **themes/custom/holy/styleguides/code**
- Some files create from: **themes/custom/holy/styleguides/template**

# CODING STANDARDS

STYLELINT
```bash
npx stylelint "css/*.css" --config .stylelintrc-css.json
npx stylelint "sass/**/*.scss" --config .stylelintrc-scss.json
```

PHPCS
```bash
phpcs --standard=Drupal --extensions=php,json,theme,css,scss,md,yml,js .
```
