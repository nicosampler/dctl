import React, { useEffect, useState, ChangeEvent, useCallback } from 'react'
import { useEthers } from '@usedapp/core'
import { Button, Modal, Field } from 'decentraland-ui'
import { isAddress } from '@ethersproject/address'
import values from 'lodash/values'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { transferAction, selectWalletByAddress } from './walletsSlice'

type props = {
  onClose: () => void
}
type FormData = { address?: string; amount?: string }
type FormErrors = { address?: string; amount?: string }

export default function TransferModal({ onClose }: props) {
  const [formData, setFormData] = useState<FormData>({ address: '', amount: '' })
  const [formError, setFormError] = useState<FormErrors>({})

  const { account } = useEthers()
  const dispatch = useAppDispatch()
  const wallet = useAppSelector((state) => selectWalletByAddress(state, account || ''))

  const isFormEmpty = useCallback(
    () => values(formData).find((value) => !!value) === undefined,
    [formData],
  )

  const isFormValid = () => values(formError).find((value) => !!value) === undefined

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }))
  }

  const transfer = () => {
    if (!isFormValid()) {
      return
    }

    dispatch(
      transferAction({
        from: wallet?.address || '',
        to: formData.address as string,
        amount: Number(formData.amount),
      }),
    )
  }

  useEffect(() => {
    const errors: FormErrors = {}

    // prevent rendering errors when form is first initialized
    if (isFormEmpty()) {
      setFormError(errors)
      return
    }

    if (!formData['address']) {
      errors['address'] = 'Required'
    } else if (!isAddress(formData['address'].toLowerCase())) {
      errors['address'] = 'Address is not valid'
    }

    if (!formData['amount']) {
      errors['amount'] = 'Required'
    } else if (!Number(formData['amount']) || (wallet?.balance || 0) < Number(formData['amount'])) {
      errors['amount'] = 'Not enough tokens'
    }

    setFormError(errors)
  }, [formData, isFormEmpty, wallet?.balance])

  return (
    <Modal size="small" open={true} onClose={onClose}>
      <Modal.Header>Transfer</Modal.Header>
      <Modal.Description>Send tokens to an account</Modal.Description>
      <Modal.Content>
        <Field
          name="address"
          label="address"
          placeholder="0x..."
          value={formData.address}
          message={formError.address}
          error={Boolean(formError.address)}
          onChange={handleChange}
        />
        <Field
          name="amount"
          label="amount"
          type="number"
          value={formData.amount}
          message={formError.amount}
          error={Boolean(formError.amount)}
          onChange={handleChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          onClick={transfer}
          disabled={isFormEmpty() || !isFormValid()}
          loading={wallet?.status === 'pending'}
        >
          Transfer
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}
