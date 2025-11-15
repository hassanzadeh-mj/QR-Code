'use client'

import { useEffect, useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { 
  Container, 
  Paper, 
  Stack, 
  TextInput, 
  Group, 
  SegmentedControl, 
  Checkbox, 
  FileInput, 
  Slider, 
  Title, 
  Text, 
  Button, 
  Card, 
  Transition, 
  rem,
  Badge,
  Box,
  Tooltip,
  ActionIcon,
  Grid,
  Avatar,
  NumberInput,
  Select,
  ThemeIcon,
  Alert,
  Progress,
  Divider
} from '@mantine/core'
import { 
  IconQrcode, 
  IconDownload, 
  IconLink, 
  IconMail, 
  IconPhone, 
  IconWifi, 
  IconAbc, 
  IconBrandGithub,
  IconPalette,
  IconSettings,
  IconUpload,
  IconCopy,
  IconShare,
  IconEye,
  IconZoomIn,
  IconZoomOut,
  IconRefresh,
  IconSparkles,
  IconInfoCircle,
  IconMapPin,
  IconCalendar,
  IconBrandWhatsapp,
  IconBrandTwitter,
  IconCreditCard,
  IconUser,
  IconBuildingStore,
  IconDeviceMobile
} from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'
type QRType = 'text' | 'url' | 'phone' | 'email' | 'wifi' | 'sms' | 'whatsapp' | 'location' | 'event' | 'vcard' | 'payment' | 'social'

const QR_TYPES = [
  { value: 'text', label: 'Text', icon: <IconAbc size={16} />, category: 'Basic' },
  { value: 'url', label: 'Website', icon: <IconLink size={16} />, category: 'Basic' },
  { value: 'email', label: 'Email', icon: <IconMail size={16} />, category: 'Contact' },
  { value: 'phone', label: 'Phone', icon: <IconPhone size={16} />, category: 'Contact' },
  { value: 'sms', label: 'SMS', icon: <IconDeviceMobile size={16} />, category: 'Contact' },
  { value: 'whatsapp', label: 'WhatsApp', icon: <IconBrandWhatsapp size={16} />, category: 'Social' },
  { value: 'wifi', label: 'WiFi', icon: <IconWifi size={16} />, category: 'Network' },
  { value: 'location', label: 'Location', icon: <IconMapPin size={16} />, category: 'Location' },
  { value: 'event', label: 'Event', icon: <IconCalendar size={16} />, category: 'Calendar' },
  { value: 'vcard', label: 'Contact Card', icon: <IconUser size={16} />, category: 'Contact' },
  { value: 'payment', label: 'Payment', icon: <IconCreditCard size={16} />, category: 'Business' },
  { value: 'social', label: 'Social Media', icon: <IconBrandTwitter size={16} />, category: 'Social' },
]

const ERROR_LEVELS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
]

const COLOR_PRESETS = [
  { name: 'Classic', bg: '#FFFFFF', fg: '#000000' },
  { name: 'Green', bg: '#f0f9f5', fg: '#7db95e' },
  { name: 'Ocean', bg: '#f0f8ff', fg: '#0284c7' },
  { name: 'Sunset', bg: '#fff7ed', fg: '#ea580c' },
  { name: 'Purple', bg: '#faf5ff', fg: '#9333ea' },
  { name: 'Forest', bg: '#f0fdf4', fg: '#166534' },
  { name: 'Rose', bg: '#fef2f2', fg: '#dc2626' },
  { name: 'Amber', bg: '#fffbeb', fg: '#d97706' },
  { name: 'Teal', bg: '#f0fdfa', fg: '#0d9488' },
  { name: 'Indigo', bg: '#f8fafc', fg: '#4f46e5' },
  { name: 'Pink', bg: '#fdf2f8', fg: '#ec4899' },
  { name: 'Dark', bg: '#1a1a1a', fg: '#ffffff' },
]

export default function QRGenerator() {
  const qrRef = useRef<HTMLDivElement>(null)
  const downloadQrRef = useRef<HTMLDivElement>(null)
  const [qrType, setQrType] = useState<QRType>('text')
  const [qrValue, setQrValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [previewSize, setPreviewSize] = useState(300)
  const [isClient, setIsClient] = useState(false)
  
  // Additional fields for complex QR types
  const [additionalFields, setAdditionalFields] = useState({
    // SMS fields
    smsNumber: '',
    smsMessage: '',
    // WhatsApp fields
    whatsappNumber: '',
    whatsappMessage: '',
    // Location fields
    latitude: '',
    longitude: '',
    locationName: '',
    // Event fields
    eventTitle: '',
    eventStart: '',
    eventEnd: '',
    eventLocation: '',
    eventDescription: '',
    // vCard fields
    vcardName: '',
    vcardPhone: '',
    vcardEmail: '',
    vcardOrganization: '',
    vcardTitle: '',
    vcardWebsite: '',
    // Payment fields
    paymentAmount: '',
    paymentCurrency: 'USD',
    paymentDescription: '',
    // WiFi fields
    wifiSSID: '',
    wifiPassword: '',
    wifiSecurity: 'WPA',
    wifiHidden: false,
    // Social media
    socialPlatform: 'twitter',
    socialUsername: '',
  })
  
  const [qrConfig, setQrConfig] = useState({
    size: 512,
    bgColor: '#FFFFFF',
    fgColor: '#7db95e',
    level: 'H' as QRErrorCorrectionLevel,
    includeMargin: true,
    logoSize: 50,
    logoOpacity: 1,
    enableLogo: false
  })

  // Client-side only initialization
  useEffect(() => {
    setIsClient(true)
  }, [])

  const logoUrl = logo ? URL.createObjectURL(logo) : null

  const generateQRValue = () => {
    switch (qrType) {
      case 'phone':
        return `tel:${inputValue}`
      case 'url':
        if (inputValue && !inputValue.startsWith('http')) {
          return `https://${inputValue}`
        }
        return inputValue
      case 'email':
        return `mailto:${inputValue}`
      case 'sms':
        return `sms:${additionalFields.smsNumber}${additionalFields.smsMessage ? `:${additionalFields.smsMessage}` : ''}`
      case 'whatsapp':
        return `https://wa.me/${additionalFields.whatsappNumber}${additionalFields.whatsappMessage ? `?text=${encodeURIComponent(additionalFields.whatsappMessage)}` : ''}`
      case 'wifi':
        return `WIFI:T:${additionalFields.wifiSecurity};S:${additionalFields.wifiSSID};P:${additionalFields.wifiPassword};H:${additionalFields.wifiHidden ? 'true' : 'false'};;`
      case 'location':
        if (additionalFields.latitude && additionalFields.longitude) {
          return `geo:${additionalFields.latitude},${additionalFields.longitude}${additionalFields.locationName ? `?q=${encodeURIComponent(additionalFields.locationName)}` : ''}`
        }
        return `geo:${inputValue}`
      case 'event':
        const startDate = additionalFields.eventStart ? new Date(additionalFields.eventStart).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : ''
        const endDate = additionalFields.eventEnd ? new Date(additionalFields.eventEnd).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : ''
        return `BEGIN:VEVENT\nSUMMARY:${additionalFields.eventTitle}\nDTSTART:${startDate}\nDTEND:${endDate}\nLOCATION:${additionalFields.eventLocation}\nDESCRIPTION:${additionalFields.eventDescription}\nEND:VEVENT`
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${additionalFields.vcardName}\nTEL:${additionalFields.vcardPhone}\nEMAIL:${additionalFields.vcardEmail}\nORG:${additionalFields.vcardOrganization}\nTITLE:${additionalFields.vcardTitle}\nURL:${additionalFields.vcardWebsite}\nEND:VCARD`
      case 'payment':
        return `${additionalFields.paymentAmount} ${additionalFields.paymentCurrency}${additionalFields.paymentDescription ? ` - ${additionalFields.paymentDescription}` : ''}`
      case 'social':
        switch (additionalFields.socialPlatform) {
          case 'twitter':
            return `https://twitter.com/${additionalFields.socialUsername}`
          case 'instagram':
            return `https://instagram.com/${additionalFields.socialUsername}`
          case 'linkedin':
            return `https://linkedin.com/in/${additionalFields.socialUsername}`
          case 'github':
            return `https://github.com/${additionalFields.socialUsername}`
          default:
            return additionalFields.socialUsername
        }
      default:
        return inputValue
    }
  }

  const handleQRInput = (value: string) => {
    setInputValue(value)
    // QR value will be updated by useEffect on client side
  }

  // Update QR value when additional fields change
  useEffect(() => {
    if (isClient) {
      setQrValue(generateQRValue())
    }
  }, [qrType, inputValue, additionalFields, isClient])

  const handleDownload = () => {
    if (!downloadQrRef.current) return
    
    const canvas = downloadQrRef.current.querySelector('canvas')
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `qr-code-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    notifications.show({
      title: 'Download Started',
      message: 'Your QR code has been downloaded successfully!',
      color: 'green',
      icon: <IconDownload size={16} />,
    })
  }

  const handleCopy = async () => {
    if (!downloadQrRef.current) return
    
    const canvas = downloadQrRef.current.querySelector('canvas')
    if (!canvas) return

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          notifications.show({
            title: 'Copied!',
            message: 'QR code copied to clipboard',
            color: 'green',
            icon: <IconCopy size={16} />,
          })
        }
      })
    } catch (error) {
      notifications.show({
        title: 'Copy Failed',
        message: 'Could not copy QR code to clipboard',
        color: 'red',
      })
    }
  }

  const applyColorPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setQrConfig(prev => ({
      ...prev,
      bgColor: preset.bg,
      fgColor: preset.fg
    }))
  }

  const getPlaceholder = () => {
    switch (qrType) {
      case 'phone': return '+1 (555) 123-4567'
      case 'url': return 'www.example.com'
      case 'email': return 'hello@example.com'
      case 'sms': return 'Enter recipient number'
      case 'whatsapp': return 'Enter phone number'
      case 'wifi': return 'Network name will be auto-filled'
      case 'location': return 'Enter address or coordinates'
      case 'event': return 'Event title will be auto-filled'
      case 'vcard': return 'Contact name will be auto-filled'
      case 'payment': return 'Payment details will be auto-filled'
      case 'social': return 'Username will be auto-filled'
      default: return 'Enter your text here...'
    }
  }

  const getInputDescription = () => {
    switch (qrType) {
      case 'phone': return 'Enter phone number with country code'
      case 'url': return 'Enter website URL (https:// will be added automatically)'
      case 'email': return 'Enter email address'
      case 'sms': return 'SMS details will be configured below'
      case 'whatsapp': return 'WhatsApp message details will be configured below'
      case 'wifi': return 'WiFi credentials will be configured below'
      case 'location': return 'Location details will be configured below'
      case 'event': return 'Event details will be configured below'
      case 'vcard': return 'Contact card details will be configured below'
      case 'payment': return 'Payment details will be configured below'
      case 'social': return 'Social media details will be configured below'
      default: return 'Enter any text content'
    }
  }

  const needsAdditionalFields = () => {
    return ['sms', 'whatsapp', 'wifi', 'location', 'event', 'vcard', 'payment', 'social'].includes(qrType)
  }

  return (
    <Box style={{ 
      background: 'linear-gradient(135deg, #f8fffe 0%, #f0f9f5 100%)',
      minHeight: '100vh',
    }}>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Stack gap="lg" align="center" pt="xl" pb="lg">
            <Group gap="md" align="center">
              <ThemeIcon 
                size={60} 
                radius="xl" 
                variant="gradient"
                gradient={{ from: '#7db95e', to: '#67a644' }}
                style={{
                  boxShadow: '0 4px 20px rgba(125, 185, 94, 0.3)',
                }}
              >
                <IconQrcode size={32} stroke={1.5} />
              </ThemeIcon>
              <Box>
                <Title order={1} size="3rem" fw={900} style={{ 
                  background: 'linear-gradient(135deg, #7db95e, #508c32)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}>
                  QR Generator
                </Title>
                <Text size="lg" c="dimmed" fw={500}>
                  Professional • Fast • Beautiful
                </Text>
              </Box>
            </Group>
            
            <Text c="dimmed" size="xl" ta="center" maw={700} style={{ lineHeight: 1.6 }}>
              Create stunning QR codes with custom logos, colors, and styling. Perfect for business cards, 
              marketing materials, and digital experiences.
            </Text>

            <Group gap="xs">
              <Badge variant="light" color="green" size="lg">Free Forever</Badge>
              <Badge variant="light" color="blue" size="lg">No Registration</Badge>
              <Badge variant="light" color="purple" size="lg">High Quality</Badge>
            </Group>
          </Stack>

          {/* Main Content */}
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Stack gap="lg">
                {/* QR Type Selection */}
                <Card className="card-enhanced" p="xl">
                  <Stack gap="lg">
                    <Group justify="space-between" align="center">
                      <Box>
                        <Title order={3} mb={4}>Content Type</Title>
                        <Text size="sm" c="dimmed">Choose what type of content your QR code will contain</Text>
                      </Box>
                      <ActionIcon variant="light" color="green" size="lg">
                        <IconSettings size={20} />
                      </ActionIcon>
                    </Group>

                    <SegmentedControl
                      fullWidth
                      data={QR_TYPES}
                      value={qrType}
                      onChange={(value) => setQrType(value as QRType)}
                      size="lg"
                      styles={{
                        root: {
                          background: 'rgba(125, 185, 94, 0.05)',
                          border: '1px solid rgba(125, 185, 94, 0.1)',
                          padding: '6px',
                          borderRadius: '12px',
                        },
                        control: {
                          border: 'none',
                          borderRadius: '8px',
                        },
                        label: {
                          padding: '12px 20px',
                          fontSize: rem(15),
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        },
                        indicator: {
                          background: 'linear-gradient(135deg, #7db95e, #67a644)',
                          boxShadow: '0 4px 15px rgba(125, 185, 94, 0.2)',
                          color: 'white',
                        },
                      }}
                    />

                    <TextInput
                      size="xl"
                      label={
                        <Group gap="xs" mb={8}>
                          <Text fw={600} size="lg">Content</Text>
                          <Tooltip label="This is what will be encoded in your QR code">
                            <IconInfoCircle size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                          </Tooltip>
                        </Group>
                      }
                      description={getInputDescription()}
                      placeholder={getPlaceholder()}
                      value={inputValue}
                      onChange={(e) => handleQRInput(e.target.value)}
                      className="input-enhanced"
                      styles={{
                        input: {
                          height: '60px',
                          fontSize: rem(16),
                          fontWeight: 500,
                        },
                      }}
                    />
                  </Stack>
                </Card>

                {/* Color Customization */}
                <Card className="card-enhanced" p="xl">
                  <Stack gap="lg">
                    <Group justify="space-between" align="center">
                      <Box>
                        <Title order={3} mb={4}>Colors & Style</Title>
                        <Text size="sm" c="dimmed">Customize the appearance of your QR code</Text>
                      </Box>
                      <ActionIcon variant="light" color="green" size="lg">
                        <IconPalette size={20} />
                      </ActionIcon>
                    </Group>

                    {/* Color Presets */}
                    <Box>
                      <Group justify="space-between" align="center" mb="md">
                        <Box>
                          <Text fw={600} size="lg">Quick Presets</Text>
                          <Text size="sm" c="dimmed">Choose from professional color combinations</Text>
                        </Box>
                        <Badge variant="light" color="green" size="sm">Popular</Badge>
                      </Group>
                      
                      <Grid gutter="sm">
                        {COLOR_PRESETS.map((preset) => {
                          const isActive = qrConfig.bgColor === preset.bg && qrConfig.fgColor === preset.fg;
                          return (
                            <Grid.Col span={{ base: 6, sm: 4, md: 3 }} key={preset.name}>
                              <Card
                                withBorder
                                radius="md"
                                p="sm"
                                style={{
                                  cursor: 'pointer',
                                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                  background: isActive 
                                    ? 'rgba(125, 185, 94, 0.1)' 
                                    : 'rgba(255, 255, 255, 0.8)',
                                  border: isActive 
                                    ? '2px solid #7db95e' 
                                    : '1px solid rgba(125, 185, 94, 0.1)',
                                  boxShadow: isActive 
                                    ? '0 4px 15px rgba(125, 185, 94, 0.2)' 
                                    : 'none',
                                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                                }}
                                onClick={() => applyColorPreset(preset)}
                                className="hover-lift"
                              >
                                <Stack gap="xs" align="center" style={{ position: 'relative' }}>
                                  <Group gap="xs" justify="center">
                                    {/* Background Color Circle */}
                                    <Box
                                      style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        background: preset.bg,
                                        border: '2px solid #e0e0e0',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                      }}
                                    />
                                    {/* Foreground Color Circle */}
                                    <Box
                                      style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        background: preset.fg,
                                        border: '2px solid #e0e0e0',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                      }}
                                    />
                                  </Group>
                                  
                                  {/* QR Code Preview */}
                                  <Box
                                    style={{
                                      width: '35px',
                                      height: '35px',
                                      borderRadius: '6px',
                                      background: preset.bg,
                                      border: '1px solid rgba(0,0,0,0.1)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      position: 'relative',
                                      overflow: 'hidden',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    }}
                                  >
                                    {/* Mini QR pattern */}
                                    <svg width="28" height="28" viewBox="0 0 32 32" style={{ color: preset.fg }}>
                                      <rect x="2" y="2" width="6" height="6" fill="currentColor"/>
                                      <rect x="24" y="2" width="6" height="6" fill="currentColor"/>
                                      <rect x="2" y="24" width="6" height="6" fill="currentColor"/>
                                      <rect x="4" y="4" width="2" height="2" fill={preset.bg}/>
                                      <rect x="26" y="4" width="2" height="2" fill={preset.bg}/>
                                      <rect x="4" y="26" width="2" height="2" fill={preset.bg}/>
                                      <rect x="10" y="2" width="2" height="2" fill="currentColor"/>
                                      <rect x="14" y="2" width="2" height="2" fill="currentColor"/>
                                      <rect x="18" y="2" width="2" height="2" fill="currentColor"/>
                                      <rect x="10" y="6" width="2" height="2" fill="currentColor"/>
                                      <rect x="18" y="6" width="2" height="2" fill="currentColor"/>
                                      <rect x="2" y="10" width="2" height="2" fill="currentColor"/>
                                      <rect x="6" y="10" width="2" height="2" fill="currentColor"/>
                                      <rect x="24" y="10" width="2" height="2" fill="currentColor"/>
                                      <rect x="28" y="10" width="2" height="2" fill="currentColor"/>
                                    </svg>
                                  </Box>
                                  
                                  <Text 
                                    size="xs" 
                                    fw={isActive ? 600 : 500}
                                    ta="center"
                                    style={{ 
                                      color: isActive ? '#7db95e' : 'inherit',
                                      fontSize: '10px',
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {preset.name}
                                  </Text>
                                  
                                  {isActive && (
                                    <Box
                                      style={{
                                        position: 'absolute',
                                        top: '2px',
                                        right: '2px',
                                        width: '14px',
                                        height: '14px',
                                        borderRadius: '50%',
                                        background: '#7db95e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 4px rgba(125, 185, 94, 0.3)',
                                      }}
                                    >
                                      <Text size="8px" c="white" fw={700}>✓</Text>
                                    </Box>
                                  )}
                                </Stack>
                              </Card>
                            </Grid.Col>
                          )
                        })}
                      </Grid>
                    </Box>

                    <Group grow>
                      <Box>
                        <Text fw={600} mb={8}>Background Color</Text>
                        <TextInput
                          type="color"
                          size="lg"
                          value={qrConfig.bgColor}
                          onChange={(e) => setQrConfig({ ...qrConfig, bgColor: e.target.value })}
                          styles={{
                            input: {
                              height: '50px',
                              cursor: 'pointer',
                              border: '2px solid rgba(125, 185, 94, 0.2)',
                            },
                          }}
                        />
                      </Box>
                      <Box>
                        <Text fw={600} mb={8}>QR Code Color</Text>
                        <TextInput
                          type="color"
                          size="lg"
                          value={qrConfig.fgColor}
                          onChange={(e) => setQrConfig({ ...qrConfig, fgColor: e.target.value })}
                          styles={{
                            input: {
                              height: '50px',
                              cursor: 'pointer',
                              border: '2px solid rgba(125, 185, 94, 0.2)',
                            },
                          }}
                        />
                      </Box>
                    </Group>

                    <Group grow>
                      <Box>
                        <Text fw={600} mb={8}>Size (pixels)</Text>
                        <NumberInput
                          size="lg"
                          min={100}
                          max={2000}
                          step={50}
                          value={qrConfig.size}
                          onChange={(value) => setQrConfig({ ...qrConfig, size: typeof value === 'number' ? value : 512 })}
                          className="input-enhanced"
                        />
                      </Box>
                      <Box>
                        <Text fw={600} mb={8}>Error Correction</Text>
                        <Select
                          size="lg"
                          data={ERROR_LEVELS}
                          value={qrConfig.level}
                          onChange={(value) => setQrConfig({ ...qrConfig, level: value as QRErrorCorrectionLevel })}
                          className="input-enhanced"
                        />
                      </Box>
                    </Group>
                  </Stack>
                </Card>

                {/* Logo Settings */}
                <Card className="card-enhanced" p="xl">
                  <Stack gap="lg">
                    <Group justify="space-between" align="center">
                      <Box>
                        <Title order={3} mb={4}>Logo Options</Title>
                        <Text size="sm" c="dimmed">Add your brand logo to the QR code center</Text>
                      </Box>
                      <Checkbox
                        size="lg"
                        checked={qrConfig.enableLogo}
                        onChange={(e) => setQrConfig({ ...qrConfig, enableLogo: e.target.checked })}
                        styles={{
                          input: {
                            borderColor: '#7db95e',
                            '&:checked': {
                              background: '#7db95e',
                              borderColor: '#7db95e',
                            },
                          },
                        }}
                      />
                    </Group>

                    <Transition mounted={qrConfig.enableLogo} transition="slide-down" duration={300}>
                      {(styles) => (
                        <Stack gap="lg" style={styles}>
                          <FileInput
                            size="lg"
                            label="Upload Logo"
                            description="PNG, JPG, or SVG recommended"
                            accept="image/*"
                            value={logo}
                            onChange={setLogo}
                            placeholder="Choose logo image"
                            leftSection={<IconUpload size={20} />}
                            className="input-enhanced"
                            styles={{
                              input: { height: '60px' },
                            }}
                          />

                          {logoUrl && (
                            <Card withBorder p="lg" radius="md" style={{ background: 'rgba(125, 185, 94, 0.05)' }}>
                              <Group>
                                <Avatar src={logoUrl} size="lg" radius="md" />
                                <Box flex={1}>
                                  <Text fw={600}>Logo Preview</Text>
                                  <Text size="sm" c="dimmed">{logo?.name}</Text>
                                </Box>
                              </Group>
                            </Card>
                          )}

                          <Group grow>
                            <Box>
                              <Text fw={600} mb="sm">Logo Size: {qrConfig.logoSize}px</Text>
                              <Slider
                                min={20}
                                max={120}
                                value={qrConfig.logoSize}
                                onChange={(value) => setQrConfig({ ...qrConfig, logoSize: value })}
                                color="green"
                                size="lg"
                              />
                            </Box>
                            <Box>
                              <Text fw={600} mb="sm">Opacity: {Math.round(qrConfig.logoOpacity * 100)}%</Text>
                              <Slider
                                min={0}
                                max={1}
                                step={0.1}
                                value={qrConfig.logoOpacity}
                                onChange={(value) => setQrConfig({ ...qrConfig, logoOpacity: value })}
                                color="green"
                                size="lg"
                              />
                            </Box>
                          </Group>
                        </Stack>
                      )}
                    </Transition>
                  </Stack>
                </Card>
              </Stack>
            </Grid.Col>

            {/* Preview Column */}
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Card className="card-enhanced" p="xl" style={{ position: 'sticky', top: '2rem' }}>
                <Stack gap="xl" align="center">
                  <Group justify="space-between" w="100%">
                    <Title order={3}>Preview</Title>
                    <Group gap="xs">
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => setPreviewSize(Math.max(200, previewSize - 50))}
                      >
                        <IconZoomOut size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => setPreviewSize(Math.min(400, previewSize + 50))}
                      >
                        <IconZoomIn size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>

                  {isClient && qrValue ? (
                    <>
                      <Paper 
                        shadow="lg" 
                        p="xl" 
                        radius="xl"
                        style={{ 
                          background: qrConfig.bgColor,
                          border: '3px solid rgba(125, 185, 94, 0.2)',
                          transition: 'all 0.3s ease',
                        }}
                        className="hover-lift"
                      >
                        <div ref={qrRef}>
                          <QRCodeCanvas
                            value={qrValue}
                            size={previewSize}
                            bgColor={qrConfig.bgColor}
                            fgColor={qrConfig.fgColor}
                            level={qrConfig.level}
                            includeMargin={qrConfig.includeMargin}
                            imageSettings={
                              qrConfig.enableLogo && logoUrl
                                ? {
                                    src: logoUrl,
                                    x: undefined,
                                    y: undefined,
                                    height: qrConfig.logoSize,
                                    width: qrConfig.logoSize,
                                    opacity: qrConfig.logoOpacity,
                                    excavate: true,
                                  }
                                : undefined
                            }
                          />
                        </div>
                      </Paper>

                      <Stack gap="sm" w="100%">
                        <Button
                          size="lg"
                          leftSection={<IconDownload size={20} />}
                          onClick={handleDownload}
                          fullWidth
                          className="btn-primary"
                          style={{ height: '60px', fontSize: rem(16), fontWeight: 600 }}
                        >
                          Download QR Code
                        </Button>
                        
                        <Group grow>
                          <Button
                            variant="light"
                            leftSection={<IconCopy size={18} />}
                            onClick={handleCopy}
                            color="green"
                          >
                            Copy
                          </Button>
                          <Button
                            variant="light"
                            leftSection={<IconShare size={18} />}
                            color="green"
                          >
                            Share
                          </Button>
                        </Group>
                      </Stack>

                      <Alert icon={<IconSparkles size={16} />} color="green" variant="light" w="100%">
                        <Text size="sm">
                          <strong>Pro Tip:</strong> Higher error correction allows for more logo coverage but creates denser QR codes.
                        </Text>
                      </Alert>
                    </>
                  ) : (
                    <Stack align="center" gap="lg" py="xl">
                      <ThemeIcon size={80} radius="xl" variant="light" color="gray">
                        <IconQrcode size={40} />
                      </ThemeIcon>
                      <Box ta="center">
                        <Text fw={600} size="lg" mb={4}>Ready to Generate</Text>
                        <Text c="dimmed" size="sm">
                          Enter your content above to see the QR code preview
                        </Text>
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Hidden download canvas */}
          <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <div ref={downloadQrRef}>
              {isClient && qrValue && (
                <QRCodeCanvas
                  value={qrValue}
                  size={qrConfig.size}
                  bgColor={qrConfig.bgColor}
                  fgColor={qrConfig.fgColor}
                  level={qrConfig.level}
                  includeMargin={qrConfig.includeMargin}
                  imageSettings={
                    qrConfig.enableLogo && logoUrl
                      ? {
                          src: logoUrl,
                          x: undefined,
                          y: undefined,
                          height: qrConfig.logoSize,
                          width: qrConfig.logoSize,
                          opacity: qrConfig.logoOpacity,
                          excavate: true,
                        }
                      : undefined
                  }
                />
              )}
            </div>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}