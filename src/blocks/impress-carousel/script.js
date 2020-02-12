const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls } = wp.editor
const { SelectControl, CheckboxControl, TextControl } = wp.components

// workaround to prevent the custom category from throwing an console warning
function setCategory () {
  if (window.location.href.indexOf('wp-admin') !== -1) {
    return 'idx-category'
  } else {
    return 'widgets'
  }
}

registerBlockType(
  'idx-broker-platinum/impress-carousel-block', {
    title: 'IMPress Carousel',
    icon: 'admin-multisite',
    category: setCategory(),
    attributes: {
      max: {
        type: 'int',
        default: 15
      },
      display: {
        type: 'int',
        default: 3
      },
      autoplay: {
        type: 'int',
        default: 1
      },
      order: {
        type: 'string',
        default: 'default'
      },
      property_type: {
        type: 'string',
        default: 'featured'
      },
      styles: {
        type: 'int',
        default: 1
      },
      new_window: {
        type: 'int',
        default: 0
      },
      saved_link_id: {
        type: 'string',
        default: ''
      },
      agent_id: {
        type: 'string',
        default: ''
      }
    },
    edit: ({ attributes, setAttributes }) => {
      const propertiesToFeature = [{ label: 'Featured', value: 'featured' }, { label: 'Sold/Pending', value: 'soldpending' }, { label: 'Supplemental', value: 'supplemental' }, { label: 'Use Saved Link', value: 'savedlinks' }]
      const sortOptions = [{ label: 'Default', value: 'default' }, { label: 'Highest to Lowest Price', value: 'high-low' }, { label: 'Lowest to Highest Price', value: 'low-high' }]
      return (
        <div>
          <div className='idx-block-placeholder-container'>
            <img src={impress_carousel_image_url} />
          </div>
          <InspectorControls>
            <SelectControl
              label={__('Properties to Display:', 'idx-broker-platinum')}
              value={attributes.property_type}
              options={propertiesToFeature}
              onChange={(value) => { setAttributes({ property_type: value }) }}
            />
            <SelectControl
              label={__('Choose a saved link (if selected above):', 'idx-broker-platinum')}
              value={attributes.saved_link_id}
              options={(impress_carousel_saved_links || [{ label: 'All', value: '' }])}
              onChange={(value) => { setAttributes({ saved_link_id: value }) }}
            />
            <SelectControl
              label={__('Limit by Agent:', 'idx-broker-platinum')}
              value={attributes.agent_id}
              options={(impress_carousel_agent_list || [{ label: 'All', value: '' }])}
              onChange={(value) => { setAttributes({ agent_id: value }) }}
            />
            <TextControl
              label={__('Listings to show without scrolling:', 'idx-broker-platinum')}
              value={attributes.display}
              type='number'
              onChange={(value) => { setAttributes({ display: value }) }}
            />
            <TextControl
              label={__('Max number of listings to show:', 'idx-broker-platinum')}
              value={attributes.max}
              type='number'
              onChange={(value) => { setAttributes({ max: value }) }}
            />
            <SelectControl
              label={__('Sort Order:', 'idx-broker-platinum')}
              value={attributes.order}
              options={sortOptions}
              onChange={(value) => { setAttributes({ order: value }) }}
            />
            <CheckboxControl
              label={__('Autoplay?', 'idx-broker-platinum')}
              value={attributes.autoplay}
              checked={(attributes.autoplay > 0)}
              onChange={(value) => { setAttributes({ autoplay: (value > 0 ? 1 : 0) }) }}
            />
            <CheckboxControl
              label={__('Open Listings in a New Window?', 'idx-broker-platinum')}
              value={attributes.new_window}
              checked={(attributes.new_window > 0)}
              onChange={(value) => { setAttributes({ new_window: (value > 0 ? 1 : 0) }) }}
            />
            <CheckboxControl
              label={__('Default Styles?', 'idx-broker-platinum')}
              value={attributes.styles}
              checked={(attributes.styles > 0)}
              onChange={(value) => { setAttributes({ styles: (value > 0 ? 1 : 0) }) }}
            />
          </InspectorControls>
        </div>
      )
    },
    save: () => {
      return null
    }
  }
)